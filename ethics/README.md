# Ethics Lab: Modern Trolley Problems

An interactive learning tool for undergraduate ethics education that explores contemporary ethical dilemmas through the lens of classical moral philosophy.

## Overview

This web-based prototype helps students develop ethical reasoning skills through randomly selected ethical dilemmas. Each session presents 3 scenarios randomly chosen from a pool of 6, covering AI ethics, autonomous vehicles, medical AI, social media governance, criminal justice, and environmental technology trade-offs.

## Core Learning Mechanisms

### 1. Active Learning Through Decision-Making
Students must commit to choices before seeing consequences or alternative perspectives. Each scenario requires explicit decision-making, reinforcing agency and accountability in ethical reasoning.

### 2. Metacognitive Reflection
After each decision, students:
- Write out their reasoning (minimum 50 characters to ensure thoughtful responses)
- Identify which ethical framework guided their choice (utilitarian, deontological, virtue ethics, or mixed)
- Articulate the principles and values behind their decisions

Research shows that writing out reasoning significantly improves transfer of ethical frameworks to new situations.

### 3. Desirable Difficulty Through Progressive Complexity

Scenarios range from complexity level 2 to 5:
- **Level 2**: Clearer dilemmas to establish mental models (autonomous vehicles, AI hiring)
- **Level 3**: Incomplete information and competing stakeholders (medical diagnostics)
- **Level 4**: Systemic complexity and second-order effects (content moderation, predictive policing)
- **Level 5**: Multiple competing values and long-term consequences (climate vs. medical innovation)

### 4. Comparative Judgment
After students make initial choices, they see how different ethical frameworks would approach the same dilemma:
- **Utilitarian perspective**: Consequences and maximizing overall good
- **Deontological perspective**: Duties, rights, and moral rules
- **Virtue ethics perspective**: Character, wisdom, and institutional values

This helps students recognize their implicit frameworks and consider alternatives.

### 5. Reflective Reconsideration
After viewing how different ethical frameworks analyze their dilemma, students are given the opportunity to reconsider their original choice:
- **Choice revision**: Students can change their decision or reaffirm their original choice
- **Metacognitive awareness**: They must articulate *why* they're changing (or not changing) their mind
- **Framework influence**: This reveals how exposure to different ethical perspectives affects moral reasoning
- **Intellectual humility**: Changing one's mind after reflection is framed as a strength, not weakness

Research shows that this "reconsideration step" deepens ethical reasoning by forcing students to explicitly grapple with whether new information should change their views.

### 6. Spaced Retrieval
At completion, students revisit an earlier scenario type (autonomous vehicles) with a variation (autonomous drones), prompting them to evaluate whether their reasoning transfers across contexts.

### 7. Productive Failure
The tool deliberately avoids "correct" answers. Instead, it:
- Presents multiple legitimate perspectives
- Shows tensions between frameworks
- Raises questions about the framing itself
- Encourages sitting with discomfort and moral uncertainty

## Scenario Pool

Students encounter 3 randomly selected scenarios from this pool of 6:

### 1. The Self-Driving Dilemma (Complexity: 2)
Autonomous vehicle crash scenario exploring who should bear risk.

### 2. Algorithmic Equity in Hiring (Complexity: 2)
AI hiring system with disparate impact, questioning algorithmic fairness definitions.

### 3. The Diagnostic Trade-off (Complexity: 3)
Medical AI configuration balancing false positives vs. false negatives.

### 4. Content Moderation at Scale (Complexity: 4)
Social media platform deciding how to handle health misinformation.

### 5. Predictive Policing and Individual Rights (Complexity: 4)
Risk-scoring system raising questions about pre-crime intervention.

### 6. The Carbon Cost of Progress (Complexity: 5)
Life-saving medical AI with massive environmental costs.

**Note:** Each session randomly selects 3 different scenarios, so students can run through the experience multiple times and encounter different combinations of ethical dilemmas.

## Features

### Student Experience
- **Random scenario selection**: 3 scenarios randomly chosen from pool of 6
- **Forced choice mechanism**: Must select before proceeding
- **Initial reflection prompts**: Structured writing about reasoning
- **Framework identification**: Self-assess ethical approach
- **Comparative analysis**: See how different frameworks approach the problem
- **Reconsideration opportunity**: Change or reaffirm choice after seeing frameworks
- **Change reasoning**: Explain why you changed (or didn't change) your mind
- **Progress tracking**: Visual indicator of completion (3 scenarios)
- **PDF journal export**: Download all reflections as a professionally formatted PDF
- **Auto-save**: Progress saved in browser localStorage
- **Replayability**: Can restart to get different scenario combinations

### Instructor Applications
- **No login required**: Simple deployment, no backend
- **Self-contained**: Single HTML file can be distributed
- **Exportable reflections**: Students can submit their journal files
- **Discussion prompts**: "Consider" sections provide talking points
- **Framework distribution**: Students see their ethical reasoning patterns

## Technical Details

### Files
- `index.html` - Main application structure
- `styles.css` - Responsive design and visual styling
- `scenarios.js` - Scenario content and framework analyses
- `app.js` - Application logic and state management

### Technologies
- Vanilla JavaScript (minimal dependencies)
- jsPDF library for PDF generation (CDN)
- CSS3 with custom properties
- localStorage for persistence
- Responsive design (mobile-friendly)

### Browser Compatibility
Works in all modern browsers (Chrome, Firefox, Safari, Edge). Requires JavaScript enabled.

## Usage

### For Students
1. Open `index.html` in a web browser
2. You'll be presented with 3 randomly selected scenarios
3. For each scenario:
   - Read through it carefully
   - Select your choice based on your reasoning
   - Complete the initial reflection prompts honestly
   - Review how different ethical frameworks approach the problem
   - Reconsider your choice - you can change it or keep it, but must explain why
4. At the end, download your reflection journal as a PDF
5. You can restart to get a different set of 3 scenarios

### For Instructors

#### Standalone Use
- Students can work through scenarios independently as homework
- Each session takes approximately 20-30 minutes for 3 scenarios
- PDF reflection journals can be submitted for assessment
- Students can run through multiple times to experience different scenario combinations
- Use as pre-class preparation for ethics discussions

#### Classroom Integration
- Project scenarios during class for group discussion
- Have students make individual choices, then discuss in small groups
- Use framework analyses to introduce philosophical traditions
- "Consider" prompts can launch deeper debates

#### Assessment Ideas
- Evaluate reflection quality, not "correct" choices
- Look for evidence of framework understanding
- Assess ability to see multiple perspectives
- Grade reconsideration reasoning - did they engage with the framework analyses?
- Examine patterns: Do students change choices? Which frameworks influence them most?
- Grade final reflection on growth and self-awareness

#### Discussion Extensions
- Compare student choice distributions before and after reconsideration (anonymously)
- Discuss what made students change their minds (or not)
- Explore which ethical frameworks were most persuasive for different scenarios
- Compare experiences across students who got different scenario combinations
- Have students who got the same scenarios discuss their reasoning differences
- Debate whether scenarios are well-framed or misleading
- Research real-world cases related to scenarios
- Have students design their own ethical dilemmas
- Assign multiple sessions as homework to ensure students experience all 6 scenarios

## Pedagogical Research Base

This tool incorporates evidence-based learning principles:

**Metacognition** (Schraw & Dennison, 1994): Prompting students to articulate their reasoning improves learning transfer.

**Desirable Difficulties** (Bjork, 1994): Progressive complexity enhances long-term retention over massed easy practice.

**Comparative Judgment** (Pollitt, 2012): Comparing approaches develops evaluative judgment better than isolated assessment.

**Spaced Practice** (Cepeda et al., 2006): Revisiting concepts with variation improves retention.

**Productive Failure** (Kapur, 2008): Struggling with complex problems before instruction deepens understanding.

## Customization

### Adding Scenarios
Edit `scenarios.js` to add new scenarios following this structure:

```javascript
{
    id: 7,
    tag: "Topic Area",
    complexity: 3, // 1-5 scale
    title: "Scenario Title",
    context: `Detailed scenario description...`,
    question: "What should you do?",
    choices: [
        {
            id: "a",
            title: "Choice title",
            description: "Choice description"
        }
        // ... more choices
    ],
    reflectionPrompt: "Reflection question...",
    analyses: {
        utilitarian: "How utilitarians would approach this...",
        deontological: "How deontologists would approach this...",
        virtue: "How virtue ethics would approach this..."
    },
    consideration: "Further questions to consider..."
}
```

### Styling
Modify `styles.css` custom properties in `:root` to change colors:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #64748b;
    /* etc. */
}
```

## Limitations & Future Enhancements

### Current Limitations
- No instructor dashboard for aggregate data
- No peer comparison features
- Limited accessibility features (screen readers)
- No multilingual support
- Requires internet connection for PDF generation library (CDN)

### Potential Enhancements
- Backend for class-wide analytics (track which scenarios students encounter)
- Peer discussion forums for each scenario
- Video expert perspectives
- Adaptive scenario selection based on student performance or learning goals
- Smart scenario selection ensuring complexity progression
- Integration with LMS platforms (Canvas, Blackboard)
- Accessibility improvements (ARIA labels, keyboard navigation)
- Offline-capable version with bundled PDF library
- Option to customize number of scenarios per session

## License

This educational tool is provided for use in academic settings. Feel free to modify and adapt for your courses.

## Contact & Feedback

For bugs, suggestions, or questions about implementing this in your course, please provide feedback to help improve the tool for ethics education.

## Acknowledgments

Inspired by:
- Philippa Foot's original trolley problem (1967)
- MIT's Moral Machine project
- Contemporary AI ethics research
- Undergraduate philosophy pedagogy literature
