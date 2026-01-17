// Application State
const app = {
    currentScenario: 0,
    responses: [],
    selectedScenarios: [], // Will hold 3 randomly selected scenario indices
    totalScenarios: 3, // Number of scenarios per session

    // Initialize the application
    init() {
        this.loadProgress();
        this.setupEventListeners();
    },

    // Randomly select 3 scenarios from the available 6
    selectRandomScenarios() {
        const allIndices = Array.from({ length: scenarios.length }, (_, i) => i);
        const shuffled = allIndices.sort(() => Math.random() - 0.5);
        this.selectedScenarios = shuffled.slice(0, this.totalScenarios);
    },

    // Start the experience
    startExperience() {
        this.selectRandomScenarios();
        this.currentScenario = 0;
        this.responses = [];
        this.saveProgress();
        this.showScreen('scenarioScreen');
        this.loadScenario(0);
        this.updateProgress();
    },

    // Load a specific scenario
    loadScenario(index) {
        const scenarioIndex = this.selectedScenarios[index];
        const scenario = scenarios[scenarioIndex];
        this.currentScenario = index;

        // Update scenario content
        document.getElementById('scenarioTag').textContent = scenario.tag;
        document.getElementById('scenarioTitle').textContent = scenario.title;
        document.getElementById('scenarioContext').innerHTML = scenario.context.replace(/\n\n/g, '</p><p>').replace(/^(.+)$/, '<p>$1</p>');
        document.getElementById('scenarioQuestion').textContent = scenario.question;

        // Update complexity indicator
        this.updateComplexityIndicator(scenario.complexity);

        // Render choices
        this.renderChoices(scenario.choices);

        this.updateProgress();
    },

    // Update complexity indicator dots
    updateComplexityIndicator(complexity) {
        const indicator = document.getElementById('complexityIndicator');
        indicator.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            const dot = document.createElement('span');
            dot.className = 'complexity-dot';
            if (i < complexity) {
                dot.classList.add('filled');
            }
            indicator.appendChild(dot);
        }
    },

    // Render choice cards
    renderChoices(choices) {
        const container = document.getElementById('choiceContainer');
        container.innerHTML = '';

        choices.forEach(choice => {
            const card = document.createElement('div');
            card.className = 'choice-card';
            card.dataset.choiceId = choice.id;
            card.innerHTML = `
                <div class="choice-title">${choice.title}</div>
                <div class="choice-description">${choice.description}</div>
            `;

            card.addEventListener('click', () => this.selectChoice(choice.id));
            container.appendChild(card);
        });
    },

    // Handle choice selection
    selectChoice(choiceId) {
        // Remove previous selection
        document.querySelectorAll('.choice-card').forEach(card => {
            card.classList.remove('selected');
        });

        // Mark this choice as selected
        const selectedCard = document.querySelector(`[data-choice-id="${choiceId}"]`);
        selectedCard.classList.add('selected');

        // Store the choice and move to reflection
        const scenario = scenarios[this.currentScenario];
        const choice = scenario.choices.find(c => c.id === choiceId);

        this.responses[this.currentScenario] = {
            scenarioId: scenario.id,
            originalChoiceId: choiceId,
            originalChoiceTitle: choice.title,
            choiceId: choiceId,
            choiceTitle: choice.title,
            timestamp: new Date().toISOString()
        };

        this.saveProgress();

        // Short delay before transition for visual feedback
        setTimeout(() => {
            this.showReflectionScreen();
        }, 300);
    },

    // Show reflection screen
    showReflectionScreen() {
        const scenarioIndex = this.selectedScenarios[this.currentScenario];
        const scenario = scenarios[scenarioIndex];
        const response = this.responses[this.currentScenario];

        document.getElementById('reflectionPrompt').textContent =
            scenario.reflectionPrompt.replace('You chose', `You chose: "${response.choiceTitle}".`);

        // Reset form
        document.getElementById('reasoningText').value = '';
        document.getElementById('charCount').textContent = '0';
        document.querySelectorAll('input[name="framework"]').forEach(radio => {
            radio.checked = false;
        });
        document.getElementById('submitReflectionBtn').disabled = true;

        this.showScreen('reflectionScreen');
    },

    // Setup event listeners
    setupEventListeners() {
        // Character counter for reasoning text
        const reasoningText = document.getElementById('reasoningText');
        reasoningText.addEventListener('input', () => {
            const count = reasoningText.value.length;
            document.getElementById('charCount').textContent = count;
            this.validateReflection();
        });

        // Framework selection
        document.querySelectorAll('input[name="framework"]').forEach(radio => {
            radio.addEventListener('change', () => {
                this.validateReflection();
            });
        });

        // Change reasoning character counter
        const changeReasoningText = document.getElementById('changeReasoningText');
        changeReasoningText.addEventListener('input', () => {
            const count = changeReasoningText.value.length;
            document.getElementById('changeCharCount').textContent = count;
            this.validateReconsideration();
        });

        // No change reasoning character counter
        const noChangeReasoningText = document.getElementById('noChangeReasoningText');
        noChangeReasoningText.addEventListener('input', () => {
            const count = noChangeReasoningText.value.length;
            document.getElementById('noChangeCharCount').textContent = count;
            this.validateReconsideration();
        });
    },

    // Validate reflection form
    validateReflection() {
        const reasoningLength = document.getElementById('reasoningText').value.length;
        const frameworkSelected = document.querySelector('input[name="framework"]:checked');

        const isValid = reasoningLength >= 50 && frameworkSelected;
        document.getElementById('submitReflectionBtn').disabled = !isValid;
    },

    // Submit reflection
    submitReflection() {
        const reasoning = document.getElementById('reasoningText').value;
        const framework = document.querySelector('input[name="framework"]:checked').value;

        // Store reflection data
        this.responses[this.currentScenario].reasoning = reasoning;
        this.responses[this.currentScenario].framework = framework;
        this.responses[this.currentScenario].reflectionTimestamp = new Date().toISOString();

        this.saveProgress();
        this.showAnalysisScreen();
    },

    // Show analysis screen with comparative frameworks
    showAnalysisScreen() {
        const scenarioIndex = this.selectedScenarios[this.currentScenario];
        const scenario = scenarios[scenarioIndex];
        const response = this.responses[this.currentScenario];

        // Display user's choice summary
        document.getElementById('yourChoiceSummary').innerHTML = `
            <h3>Your Choice</h3>
            <p><strong>${response.originalChoiceTitle}</strong></p>
            <p><em>You identified your approach as: ${this.getFrameworkName(response.framework)}</em></p>
            <p>${response.reasoning}</p>
        `;

        // Display framework analyses
        document.getElementById('utilitarianAnalysis').textContent = scenario.analyses.utilitarian;
        document.getElementById('deontologicalAnalysis').textContent = scenario.analyses.deontological;
        document.getElementById('virtueAnalysis').textContent = scenario.analyses.virtue;

        // Display consideration prompt
        document.getElementById('considerationPrompt').textContent = scenario.consideration;

        this.showScreen('analysisScreen');
    },

    // Show reconsideration screen
    showReconsiderationScreen() {
        const scenarioIndex = this.selectedScenarios[this.currentScenario];
        const scenario = scenarios[scenarioIndex];
        const response = this.responses[this.currentScenario];

        // Display original choice reminder
        document.getElementById('originalChoiceReminder').innerHTML = `
            <h3>Your Original Choice</h3>
            <p class="choice-label">${response.originalChoiceTitle}</p>
            <p><em>Framework: ${this.getFrameworkName(response.framework)}</em></p>
        `;

        // Render choices for reconsideration
        this.renderReconsiderationChoices(scenario.choices, response.originalChoiceId);

        // Reset reflection sections
        document.getElementById('changeReflectionSection').style.display = 'none';
        document.getElementById('noChangeReflectionSection').style.display = 'none';
        document.getElementById('changeReasoningText').value = '';
        document.getElementById('noChangeReasoningText').value = '';
        document.getElementById('changeCharCount').textContent = '0';
        document.getElementById('noChangeCharCount').textContent = '0';
        document.getElementById('submitReconsiderationBtn').disabled = true;

        this.showScreen('reconsiderationScreen');
    },

    // Render choices for reconsideration
    renderReconsiderationChoices(choices, originalChoiceId) {
        const container = document.getElementById('reconsiderationChoiceContainer');
        container.innerHTML = '';

        choices.forEach(choice => {
            const card = document.createElement('div');
            card.className = 'choice-card';
            card.dataset.choiceId = choice.id;

            // Mark original choice
            if (choice.id === originalChoiceId) {
                card.classList.add('original-choice');
            }

            card.innerHTML = `
                <div class="choice-title">${choice.title}</div>
                <div class="choice-description">${choice.description}</div>
            `;

            card.addEventListener('click', () => this.reconsiderChoice(choice.id));
            container.appendChild(card);
        });
    },

    // Handle reconsideration choice
    reconsiderChoice(choiceId) {
        const response = this.responses[this.currentScenario];
        const scenarioIndex = this.selectedScenarios[this.currentScenario];
        const scenario = scenarios[scenarioIndex];
        const choice = scenario.choices.find(c => c.id === choiceId);

        // Remove previous selection styling
        document.querySelectorAll('#reconsiderationChoiceContainer .choice-card').forEach(card => {
            card.classList.remove('selected', 'changed-choice');
        });

        // Mark this choice as selected
        const selectedCard = document.querySelector(`#reconsiderationChoiceContainer [data-choice-id="${choiceId}"]`);
        selectedCard.classList.add('selected');

        // Update response data
        response.finalChoiceId = choiceId;
        response.finalChoiceTitle = choice.title;
        response.choiceChanged = (choiceId !== response.originalChoiceId);

        // Show appropriate reflection section
        if (response.choiceChanged) {
            // Mark the new choice
            selectedCard.classList.add('changed-choice');
            document.getElementById('changeReflectionSection').style.display = 'block';
            document.getElementById('noChangeReflectionSection').style.display = 'none';
        } else {
            document.getElementById('changeReflectionSection').style.display = 'none';
            document.getElementById('noChangeReflectionSection').style.display = 'block';
        }

        this.validateReconsideration();
    },

    // Validate reconsideration form
    validateReconsideration() {
        const response = this.responses[this.currentScenario];

        if (!response || response.finalChoiceId === undefined) {
            document.getElementById('submitReconsiderationBtn').disabled = true;
            return;
        }

        let isValid = false;

        if (response.choiceChanged) {
            const changeReasoningLength = document.getElementById('changeReasoningText').value.length;
            isValid = changeReasoningLength >= 50;
        } else {
            const noChangeReasoningLength = document.getElementById('noChangeReasoningText').value.length;
            isValid = noChangeReasoningLength >= 50;
        }

        document.getElementById('submitReconsiderationBtn').disabled = !isValid;
    },

    // Submit reconsideration
    submitReconsideration() {
        const response = this.responses[this.currentScenario];

        if (response.choiceChanged) {
            response.changeReasoning = document.getElementById('changeReasoningText').value;
        } else {
            response.noChangeReasoning = document.getElementById('noChangeReasoningText').value;
        }

        // Update final choice data
        response.choiceId = response.finalChoiceId;
        response.choiceTitle = response.finalChoiceTitle;
        response.reconsiderationTimestamp = new Date().toISOString();

        this.saveProgress();
        this.nextScenario();
    },

    // Get framework display name
    getFrameworkName(framework) {
        const names = {
            utilitarian: 'Utilitarian',
            deontological: 'Deontological',
            virtue: 'Virtue Ethics',
            unsure: 'Unsure/Mixed'
        };
        return names[framework] || framework;
    },

    // Move to next scenario
    nextScenario() {
        if (this.currentScenario < this.totalScenarios - 1) {
            this.currentScenario++;
            this.loadScenario(this.currentScenario);
            this.showScreen('scenarioScreen');
        } else {
            this.showCompletionScreen();
        }
    },

    // Show completion screen with summary
    showCompletionScreen() {
        this.renderFrameworkChart();
        this.renderCallbackScenario();
        this.showScreen('completionScreen');
    },

    // Render framework distribution chart
    renderFrameworkChart() {
        const frameworks = {
            utilitarian: 0,
            deontological: 0,
            virtue: 0,
            unsure: 0
        };

        this.responses.forEach(response => {
            if (response.framework) {
                frameworks[response.framework]++;
            }
        });

        const total = this.responses.length;
        const chartContainer = document.getElementById('frameworkChart');
        chartContainer.innerHTML = '';

        Object.keys(frameworks).forEach(framework => {
            const count = frameworks[framework];
            const percentage = Math.round((count / total) * 100);

            const barDiv = document.createElement('div');
            barDiv.className = 'chart-bar';
            barDiv.innerHTML = `
                <div class="chart-label">
                    <span>${this.getFrameworkName(framework)}</span>
                    <span>${count} scenario(s)</span>
                </div>
                <div class="chart-fill-container">
                    <div class="chart-fill" style="width: ${percentage}%">
                        ${percentage > 10 ? percentage + '%' : ''}
                    </div>
                </div>
            `;
            chartContainer.appendChild(barDiv);
        });
    },

    // Render callback scenario for spaced retrieval
    renderCallbackScenario() {
        // Randomly select one of the scenarios the student encountered
        const randomIndex = Math.floor(Math.random() * this.selectedScenarios.length);
        const selectedScenarioId = scenarios[this.selectedScenarios[randomIndex]].id;

        // Get the corresponding callback scenario
        const callback = callbackScenarios[selectedScenarioId];

        if (callback) {
            document.getElementById('callbackScenario').innerHTML = `
                <h4>${callback.title}</h4>
                <p>${callback.context}</p>
                <p style="margin-top: 15px; font-weight: 600; color: var(--primary-color);">${callback.prompt}</p>
            `;
        }
    },

    // Download results as PDF
    downloadResults() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 20;
        const maxWidth = pageWidth - (margin * 2);
        let yPos = margin;

        // Helper function to add text with automatic page breaks
        const addText = (text, fontSize = 10, isBold = false) => {
            doc.setFontSize(fontSize);
            if (isBold) {
                doc.setFont(undefined, 'bold');
            } else {
                doc.setFont(undefined, 'normal');
            }

            const lines = doc.splitTextToSize(text, maxWidth);
            lines.forEach(line => {
                if (yPos > pageHeight - margin) {
                    doc.addPage();
                    yPos = margin;
                }
                doc.text(line, margin, yPos);
                yPos += fontSize * 0.5;
            });
            yPos += 3;
        };

        // Title
        addText('ETHICS LAB - REFLECTION JOURNAL', 16, true);
        yPos += 5;
        addText(`Completed: ${new Date().toLocaleString()}`, 10);
        yPos += 10;

        // Scenarios
        this.responses.forEach((response, index) => {
            const scenarioIndex = this.selectedScenarios[index];
            const scenario = scenarios[scenarioIndex];

            // Scenario header
            addText(`SCENARIO ${index + 1}: ${scenario.title}`, 14, true);
            addText(`Topic: ${scenario.tag} | Complexity: ${scenario.complexity}/5`, 9);
            yPos += 3;

            // Original choice
            addText('ORIGINAL CHOICE:', 11, true);
            addText(response.originalChoiceTitle, 10);
            yPos += 2;

            addText(`Ethical Framework: ${this.getFrameworkName(response.framework)}`, 10, true);
            yPos += 2;

            addText('Initial Reasoning:', 10, true);
            addText(response.reasoning, 10);
            yPos += 5;

            // Reconsideration
            if (response.choiceChanged) {
                addText(`RECONSIDERED - CHANGED TO: ${response.finalChoiceTitle}`, 11, true);
                yPos += 2;
                addText('Why I Changed My Mind:', 10, true);
                addText(response.changeReasoning, 10);
            } else {
                addText('RECONSIDERED - KEPT ORIGINAL CHOICE', 11, true);
                yPos += 2;
                addText('Why I Stood By My Choice:', 10, true);
                addText(response.noChangeReasoning, 10);
            }
            yPos += 10;
        });

        // Add callback reflection if filled
        const callbackText = document.getElementById('callbackReflection').value;
        if (callbackText) {
            if (yPos > pageHeight - 80) {
                doc.addPage();
                yPos = margin;
            }
            addText('SPACED RETRIEVAL REFLECTION', 12, true);
            yPos += 2;
            addText(callbackText, 10);
            yPos += 10;
        }

        // Add final reflection if filled
        const finalText = document.getElementById('finalReflection').value;
        if (finalText) {
            if (yPos > pageHeight - 80) {
                doc.addPage();
                yPos = margin;
            }
            addText('FINAL REFLECTION', 12, true);
            yPos += 2;
            addText(finalText, 10);
        }

        // Save the PDF
        doc.save(`ethics-lab-reflection-${new Date().toISOString().split('T')[0]}.pdf`);
    },

    // Restart the experience
    restart() {
        if (confirm('Are you sure you want to start over? Your current progress will be lost.')) {
            this.responses = [];
            this.currentScenario = 0;
            localStorage.removeItem('ethicsLabProgress');
            this.showScreen('welcomeScreen');
            this.updateProgress();
        }
    },

    // Screen management
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
        window.scrollTo(0, 0);
    },

    // Update progress bar
    updateProgress() {
        const total = this.totalScenarios;
        const current = this.currentScenario + 1;
        const percentage = (this.currentScenario / total) * 100;

        document.getElementById('progressBar').style.width = percentage + '%';
        document.getElementById('progressText').textContent = `Scenario ${current} of ${total}`;
    },

    // Save progress to localStorage
    saveProgress() {
        localStorage.setItem('ethicsLabProgress', JSON.stringify({
            currentScenario: this.currentScenario,
            responses: this.responses,
            selectedScenarios: this.selectedScenarios
        }));
    },

    // Load progress from localStorage
    loadProgress() {
        const saved = localStorage.getItem('ethicsLabProgress');
        if (saved) {
            const data = JSON.parse(saved);
            this.currentScenario = data.currentScenario;
            this.responses = data.responses;
            this.selectedScenarios = data.selectedScenarios || [];
        }
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
