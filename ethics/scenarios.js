// Scenarios with progressive complexity (1-5 difficulty scale)
const scenarios = [
    {
        id: 1,
        tag: "Autonomous Vehicles",
        complexity: 2,
        title: "The Self-Driving Dilemma",
        context: `You're a software engineer at an autonomous vehicle company. Your team is programming the decision-making algorithm for unavoidable accident scenarios.

In a specific situation, the car detects that brake failure will cause a collision. The car can either:
- Continue straight and hit a barrier, likely causing serious injury to the two passengers
- Swerve right into a pedestrian, who will likely be killed
- Swerve left off a bridge, certainly killing both passengers

The algorithm must make this decision in milliseconds.`,
        question: "How should the car be programmed to respond?",
        choices: [
            {
                id: "a",
                title: "Protect the passengers - hit the barrier",
                description: "Prioritize the safety of the people who trusted the vehicle"
            },
            {
                id: "b",
                title: "Minimize total harm - swerve into the pedestrian",
                description: "One death is better than two deaths"
            },
            {
                id: "c",
                title: "Do nothing - maintain course to the bridge",
                description: "The car shouldn't make life-or-death judgments; let physics decide"
            },
            {
                id: "d",
                title: "Random selection",
                description: "No one outcome is morally superior; randomize to avoid systematic bias"
            }
        ],
        reflectionPrompt: "You chose to have the car programmed to prioritize this outcome. What moral principle guided your decision?",
        analyses: {
            utilitarian: "A utilitarian calculus would prioritize minimizing total deaths and injuries. This might favor hitting the barrier (injuring 2) over killing the pedestrian (1 death) or going off the bridge (2 deaths). However, utilitarians must also consider long-term consequences: will people trust self-driving cars if they sacrifice pedestrians? Will they trust them if they sacrifice passengers?",
            deontological: "Deontological ethics focuses on duties and rules. There's a strong moral duty not to kill (hitting the pedestrian). There's also the principle of double effect: the passengers consented to risks by entering the car; the pedestrian did not. A deontologist might argue the car should never actively choose to kill an innocent bystander, even to save passengers.",
            virtue: "Virtue ethics asks: what would a person of good character do? Key virtues include justice (treating all lives equally), wisdom (understanding unintended consequences), and integrity (being honest about moral tradeoffs). A virtuous engineer might refuse to program utilitarian calculations that treat humans as numbers, instead advocating for better brakes and safety systems."
        },
        consideration: "Many ethicists argue the 'trolley problem' framing is itself problematic for AI ethics. It assumes an unavoidable choice when the real ethical question is: why are we building systems that might face this choice? Should we focus instead on prevention, redundancy, and keeping humans in the loop?"
    },
    {
        id: 2,
        tag: "AI Hiring",
        complexity: 2,
        title: "Algorithmic Equity in Hiring",
        context: `Your company uses an AI system to screen job applicants. The algorithm was trained on 10 years of hiring data from your company and has been shown to predict job success with 85% accuracy.

However, an audit reveals the algorithm rejects women at 1.5 times the rate of men with identical qualifications. Investigation shows this pattern emerged because:
- Historical hiring data reflected past biased decisions
- The algorithm learned that certain word choices in applications (more common among women) correlated with rejection
- However, the algorithm's overall accuracy is higher than human recruiters (who have 78% accuracy)

If you remove the algorithm, you'll return to less accurate human screening that still shows bias, just less systematically.`,
        question: "What should you do?",
        choices: [
            {
                id: "a",
                title: "Keep the algorithm - it's more accurate overall",
                description: "Better decisions for the company, even with disparate impact"
            },
            {
                id: "b",
                title: "Remove the algorithm entirely",
                description: "Return to human judgment to avoid systematic discrimination"
            },
            {
                id: "c",
                title: "Modify the algorithm to ensure equal acceptance rates",
                description: "Constrain the AI to achieve statistical parity between groups"
            },
            {
                id: "d",
                title: "Use the algorithm but add human review for rejected candidates",
                description: "Hybrid approach to catch algorithmic bias while maintaining efficiency"
            }
        ],
        reflectionPrompt: "You selected this approach to the biased hiring algorithm. What values or principles were most important in your decision?",
        analyses: {
            utilitarian: "Utilitarians must weigh competing goods: accurate hiring helps the company and arguably helps place the best candidates in jobs. But systematic bias harms women's opportunities and perpetuates inequality, causing widespread suffering. A sophisticated utilitarian analysis might favor option D (hybrid review) as it maintains accuracy benefits while reducing harm - though this assumes human reviewers won't simply defer to the algorithm.",
            deontological: "Deontological ethics emphasizes treating people as ends in themselves, never merely as means. Using an algorithm known to discriminate treats women as means to the company's efficiency goals. Even if the algorithm is 'more fair' than biased humans on average, it still violates the categorical imperative by applying different standards based on group membership. This view likely supports removing or fundamentally redesigning the system.",
            virtue: "Virtue ethics asks about character and institutional values. What kind of company do you want to be? Continuing to use a known discriminatory system suggests valuing efficiency over justice. However, removing it in favor of biased humans seems like avoiding responsibility rather than solving the problem. A virtue-based approach might focus on the organizational commitment to addressing bias - examining why historical data was biased and building systems that embody fairness."
        },
        consideration: "This scenario illustrates a key challenge in AI ethics: 'fairness' has multiple mathematical definitions that can contradict each other. Equal acceptance rates (demographic parity) can conflict with equal error rates (equalized odds) and predictive parity. There may be no solution that satisfies all fairness criteria simultaneously. How do we decide which conception of fairness matters most?"
    },
    {
        id: 3,
        tag: "Medical AI",
        complexity: 3,
        title: "The Diagnostic Trade-off",
        context: `You're implementing an AI diagnostic system for detecting a rare but deadly disease. The disease affects 1 in 10,000 people and is fatal if not treated early.

Your AI system has two possible configurations:

**High Sensitivity Mode:**
- Detects 95% of true cases (missing only 5%)
- But produces false positives for 2% of healthy people
- In a population of 10,000: catches 9-10 sick people, but incorrectly flags ~200 healthy people for invasive follow-up testing

**High Specificity Mode:**
- Only 0.5% false positive rate (much fewer healthy people flagged)
- But detects only 75% of true cases (missing 25%)
- In a population of 10,000: catches 7-8 sick people, incorrectly flags ~50 healthy people

The follow-up tests are expensive, anxiety-inducing, and carry small health risks. Missing a true case means likely death.`,
        question: "Which configuration should be deployed?",
        choices: [
            {
                id: "a",
                title: "High Sensitivity - catch more sick people",
                description: "Prioritize saving lives even with more false positives"
            },
            {
                id: "b",
                title: "High Specificity - minimize false alarms",
                description: "Avoid harming healthy people with unnecessary tests and anxiety"
            },
            {
                id: "c",
                title: "Let patients choose their preferred mode",
                description: "Different people weigh these trade-offs differently"
            },
            {
                id: "d",
                title: "Use different modes for different risk populations",
                description: "High sensitivity for high-risk groups, high specificity for others"
            }
        ],
        reflectionPrompt: "You chose this approach to configuring the diagnostic AI. How did you weigh the competing harms of false positives versus false negatives?",
        analyses: {
            utilitarian: "A utilitarian analysis requires quantifying harms: death from missed diagnosis, anxiety and medical risks from false positives, economic costs. If we value preventing death very highly, high sensitivity seems better (saving 2-3 more lives per 10,000 at the cost of 150 more false positives). But what if those false positives lead some to avoid future screening? What about healthcare system costs reducing other beneficial care? The 'correct' utilitarian answer depends heavily on how we weight and measure these competing goods.",
            deontological: "From a deontological view, do we have a stronger duty to prevent harm (false negatives leading to death) or to avoid causing harm (false positives causing unnecessary medical procedures)? The doctrine of double effect suggests there's a moral distinction: a false negative fails to help someone, while a false positive actively subjects someone to unwanted medical intervention. However, deploying the lower-sensitivity system when a better option exists might violate our duty to benefit others when we can.",
            virtue: "Virtue ethics emphasizes wisdom, compassion, and honesty. A virtuous approach would ensure patients understand these trade-offs rather than making paternalistic choices for them (supporting option C). It would also question whether this is the right framing: why not invest in better diagnostic technology that reduces both error types? Courage might mean being honest with patients and the public about AI limitations rather than overselling algorithmic decision-making."
        },
        consideration: "This scenario reveals how invisible algorithmic choices encode value judgments. Most people never learn which trade-offs their diagnostic systems prioritize. Should there be democratic input into these configurations? Should they be publicly disclosed? What role should medical ethics boards play in these decisions versus engineers and data scientists?"
    },
    {
        id: 4,
        tag: "Social Media",
        complexity: 4,
        title: "Content Moderation at Scale",
        context: `You lead content moderation at a major social media platform with 2 billion users. Your AI system must balance free expression with preventing harm.

You've identified a coordinated group spreading medical misinformation about vaccines, leading to measurable decreases in vaccination rates and disease outbreaks. However:

- The content doesn't explicitly violate your policies (no direct calls to violence)
- Much of it consists of true information presented misleadingly (citing real studies but distorting their conclusions)
- The posters genuinely believe they're protecting public health
- Your platform's algorithm has been amplifying this content because it generates high engagement
- Taking action will inevitably lead to accusations of censorship and political bias
- Not taking action conflicts with your platform's stated commitment to public health
- Any AI-based moderation at this scale will have errors - potentially silencing legitimate debate about vaccine safety and policy

Additionally, you've discovered that your recommendation algorithm actively promotes this content to users who show any vaccine hesitancy, creating filter bubbles.`,
        question: "What should you do?",
        choices: [
            {
                id: "a",
                title: "Remove the content and accounts",
                description: "Public health emergency justifies aggressive moderation"
            },
            {
                id: "b",
                title: "Don't remove, but stop algorithmic amplification",
                description: "Allow speech but don't actively promote harmful content"
            },
            {
                id: "c",
                title: "Add fact-check labels but don't remove or de-amplify",
                description: "Provide counter-information and trust users to decide"
            },
            {
                id: "d",
                title: "No intervention - maintain platform neutrality",
                description: "The platform shouldn't be arbiter of truth on controversial topics"
            }
        ],
        reflectionPrompt: "You chose this content moderation approach. What principles guided how you balanced free expression against potential public health harm?",
        analyses: {
            utilitarian: "Utilitarians must weigh harms: disease and death from vaccine hesitancy versus chilling effects on legitimate speech. If misinformation measurably increases disease, aggressive moderation seems justified. But consider second-order effects: does heavy-handed moderation increase distrust and conspiracy thinking? Does it push discussions to less regulated platforms? And who decides what counts as 'misinformation' - what if medical consensus is wrong or evolving? A utilitarian might favor option B (de-amplification) as balancing speech and harm reduction.",
            deontological: "Deontological frameworks emphasize rights and duties. People have rights to free expression, but do platforms have duties not to amplify harm? There's a distinction between removing speech (censorship) and choosing what to amplify (editorial discretion). Deontologists might argue platforms have no duty to promote all content equally, so de-amplification respects both speech rights and public health duties. However, some deontological views prioritize free speech so highly that even algorithmic de-amplification is problematic government-like power.",
            virtue: "Virtue ethics asks: what does intellectual honesty, courage, and wisdom look like in platform governance? Wisdom recognizes the limits of any one actor's ability to determine truth. Intellectual honesty means acknowledging the platform's own role in creating the problem (engagement-driven algorithms). Courage might mean admitting 'we built systems we can't responsibly govern' rather than choosing between bad options. A virtue-based approach might fundamentally redesign recommendation systems rather than content moderation."
        },
        consideration: "This scenario raises questions about corporate power and public goods. Social media platforms make quasi-governmental decisions about speech but aren't democratically accountable. Should these decisions be made by private companies at all? What's the role of transparency - should platforms disclose their moderation rules and algorithmic amplification criteria? Who should oversee these decisions?"
    },
    {
        id: 5,
        tag: "Criminal Justice",
        complexity: 4,
        title: "Predictive Policing and Individual Rights",
        context: `Your city is piloting a predictive policing system. The AI analyzes crime patterns, social network data, and individual risk factors to identify people at high risk of committing violent crimes in the next 6 months.

The system has 70% accuracy (correctly identifies 70 out of 100 people who would commit violent crimes). However, it also has a 30% false positive rate (incorrectly flags 30 out of 100 non-offenders).

People identified as high-risk receive mandatory interventions:
- Monthly check-ins with social workers
- Job training and mental health resources
- Enhanced police monitoring in their neighborhoods

The program appears to reduce violent crime by 15%. But concerns emerge:

- The algorithm disproportionately flags people from already over-policed minority neighborhoods
- People are subjected to intervention before committing any crime
- Those flagged report feeling stigmatized and surveilled
- The "social support" includes increased police presence
- Neighborhoods with monitoring see more arrests for minor offenses (possibly because of increased police presence, not increased crime)
- People can't challenge their risk score or know what data was used

Civil liberties groups call it "pre-crime punishment." Police say it's preventive social support.`,
        question: "Should the city continue this program?",
        choices: [
            {
                id: "a",
                title: "Continue and expand the program",
                description: "15% crime reduction saves lives; refine the algorithm to reduce bias"
            },
            {
                id: "b",
                title: "Continue but make participation voluntary",
                description: "Offer support services without mandatory monitoring"
            },
            {
                id: "c",
                title: "Restructure: provide resources without risk-scoring",
                description: "Offer job training and mental health services community-wide"
            },
            {
                id: "d",
                title: "End the program entirely",
                description: "Predictive systems that constrain liberty before crimes occur are fundamentally unjust"
            }
        ],
        reflectionPrompt: "You selected this approach to predictive policing. How did you balance crime prevention against individual rights and concerns about discriminatory impact?",
        analyses: {
            utilitarian: "A utilitarian must weigh crime reduction benefits against harms of false positives and systemic effects. Preventing violent crime creates substantial good. But consider all consequences: stigma for those flagged, community distrust of police, long-term effects of surveillance on neighborhoods, and whether increased arrests for minor offenses create net harm. A sophisticated analysis might reveal that option C (universal services) produces better outcomes than targeted intervention - addressing root causes without the harms of algorithmic labeling.",
            deontological: "Deontological ethics raises profound objections to predictive policing. It violates the principle that people should be judged for their actions, not predictions. Even if statistically accurate, treating individuals based on group patterns fails to respect their autonomy and capacity for choice. The categorical imperative asks: what if everyone were subjected to such systems? This leads to a surveillance state incompatible with human dignity. Option D (ending the program) aligns with deontological commitments to individual rights and presumption of innocence.",
            virtue: "Virtue ethics examines institutional character. What kind of society do we want to be? One that surveils people who haven't committed crimes suggests we lack trust, mercy, and respect for human agency. However, virtue ethics also values practical wisdom: if we know interventions can prevent violence, is it virtuous to withhold them? The key may be how interventions are framed and delivered. Option C reflects virtues of justice (equal access to resources) and wisdom (addressing root causes rather than policing symptoms)."
        },
        consideration: "This scenario exposes tensions between security and freedom that technology intensifies. Predictive algorithms make possible interventions that were previously impractical, but 'can we?' doesn't answer 'should we?' Consider: what if accuracy improved to 90%? 95%? Is there a threshold where predictive intervention becomes acceptable, or is it wrong in principle? What's the difference between this and other risk-based interventions (e.g., mental health crisis intervention)?"
    },
    {
        id: 6,
        tag: "Climate & AI",
        complexity: 5,
        title: "The Carbon Cost of Progress",
        context: `You lead an AI research lab developing medical diagnostic systems. Your latest model shows remarkable promise for early cancer detection, potentially saving tens of thousands of lives annually.

However, training this model requires massive computational resources:
- Training one model produces carbon emissions equivalent to 5 average American lifetimes
- The energy consumption is comparable to a small town's annual electricity use
- Most of this energy comes from fossil fuels
- After deployment, the model will require continuous retraining as medical knowledge evolves
- Running inference (making diagnoses) at scale will add ongoing environmental costs

Your team proposes three approaches:

**Approach A:** Deploy the current model globally despite environmental costs. Lives saved from cancer detection far outweigh carbon impact.

**Approach B:** Deploy only in wealthy countries that can afford carbon offsets and invest in renewable energy infrastructure.

**Approach C:** Delay deployment for 2-3 years while you develop a more efficient model, knowing people will die from delayed cancer detection during this period.

**Complicating factors:**
- Climate change disproportionately harms people in developing nations who would most benefit from the diagnostic tool
- Your institution faces pressure to publish and deploy to maintain funding and prestige
- Competitors may deploy less accurate but more efficient models, potentially establishing inferior technology as the standard
- The skills and resources spent making the model efficient could instead be spent developing new life-saving technologies`,
        question: "Which approach do you take?",
        choices: [
            {
                id: "a",
                title: "Deploy globally now - lives saved justify carbon cost",
                description: "Immediate medical benefit outweighs environmental impact"
            },
            {
                id: "b",
                title: "Deploy only in regions with clean energy",
                description: "Balance innovation with environmental responsibility"
            },
            {
                id: "c",
                title: "Delay for efficiency improvements",
                description: "Accept short-term costs for long-term sustainability"
            },
            {
                id: "d",
                title: "Deploy but commit resources to carbon offset projects",
                description: "Move forward while mitigating environmental harm"
            }
        ],
        reflectionPrompt: "You chose this approach to balancing medical innovation against environmental impact. How did you weigh immediate lives saved against long-term climate effects and global justice concerns?",
        analyses: {
            utilitarian: "Utilitarian calculation here is extraordinarily complex. How do we compare immediate, identifiable lives saved from cancer versus diffuse, future climate harms? Standard utilitarian approaches might favor deployment (tens of thousands of lives saved annually vs. carbon equivalent to ~200 people's lifetime emissions). But this ignores distributional justice: climate harms disproportionately affect those least responsible. It also ignores precedent-setting: if every beneficial technology gets an 'emergency' exception for carbon costs, we never address the systemic problem. Option D (offset) or C (delay) might better maximize long-term welfare.",
            deontological: "Deontological frameworks emphasize duties and rights. Do we have a stronger duty to save identifiable people dying of cancer now, or to not contribute to climate change that will harm future generations? The principle of double effect might suggest deployment is permissible if the intention is saving lives (with carbon as foreseen but unintended side effect). However, given knowledge of climate impacts, can we claim carbon emissions are truly 'unintended'? Rights-based views must grapple with competing rights: present patients' rights to healthcare vs. future people's rights not to be harmed by our actions.",
            virtue: "Virtue ethics asks about character and wisdom. Wisdom requires acknowledging tragic choices: there may be no option without significant harm. Courage means being honest about trade-offs rather than assuming technology is always 'worth it.' Justice demands considering who bears costs and who receives benefits - deploying globally (A) provides medical benefits while imposing climate costs disproportionately on the global poor. A virtuous approach might involve humility: questioning whether every technically achievable AI model should be built, and whether AI is always the best solution to medical diagnostic challenges."
        },
        consideration: "This scenario illustrates how AI ethics intersects with broader questions of sustainability, global justice, and technological solutionism. It challenges the assumption that medical innovation is an unalloyed good. Consider: Should there be 'carbon budgets' for AI research? Who decides which AI applications justify environmental costs? How do we account for opportunity costs - might the resources spent on this AI be better used for preventive care, health education, or addressing root causes of cancer? What's our responsibility to future generations?"
    }
];

// Callback scenarios for spaced retrieval - each corresponds to a main scenario
const callbackScenarios = {
    1: { // Self-Driving Dilemma callback
        title: "The Autonomous Delivery Drone",
        context: `An autonomous delivery drone experiences a malfunction over a crowded park. It can: (1) attempt emergency landing in the park, risking injuring 2-3 people; (2) fly to a nearby empty parking lot, but it might not make it and could crash into buildings; or (3) initiate self-destruct over an empty field, destroying the expensive drone and medical supplies it's carrying to a hospital.`,
        prompt: "Does your reasoning from the self-driving car scenario still apply here? Why or why not?"
    },
    2: { // AI Hiring callback
        title: "University Admissions Algorithm",
        context: `Your university uses an AI to help with admissions decisions. The algorithm is 80% accurate at predicting student success, but an audit shows it admits students from wealthy zip codes at 1.4 times the rate of equally qualified students from low-income areas. This bias emerged because the training data included legacy admissions and extracurricular activities more accessible to wealthy students. The admissions team is more biased (favoring wealthy students at 1.8x rate) but only 70% accurate at predicting success.`,
        prompt: "How does this educational context change your thinking about algorithmic bias compared to the hiring scenario?"
    },
    3: { // Medical AI callback
        title: "Cancer Screening Recommendation",
        context: `A new cancer screening test for a rare but deadly cancer faces the same trade-offs you saw earlier. However, this time: (1) The disease affects mainly young children; (2) False positives require a painful biopsy procedure; (3) The test would be deployed in lower-income countries where healthcare resources are scarce; (4) High sensitivity mode would consume 3x the medical resources.`,
        prompt: "Does changing the patient population (children) and resource context (lower-income countries) affect your reasoning about sensitivity vs. specificity trade-offs?"
    },
    4: { // Content Moderation callback
        title: "Climate Change Misinformation",
        context: `Your platform faces coordinated climate change denial content that cherry-picks real scientific data to argue climate change isn't human-caused. Unlike vaccine misinformation, the scientific consensus is slightly less unified (95% vs 99%), and the content doesn't cause immediate health harm. However, it may contribute to policy paralysis on an existential threat. The posts generate high engagement and the posters genuinely believe they're fighting against a political agenda masquerading as science.`,
        prompt: "How does the difference in immediacy of harm and strength of scientific consensus change your approach to content moderation?"
    },
    5: { // Predictive Policing callback
        title: "School Threat Assessment AI",
        context: `A school district implements an AI system analyzing student social media, attendance patterns, and behavioral reports to identify students at high risk of committing violence (65% accuracy, 35% false positive rate). Identified students receive mandatory counseling, closer monitoring, and are banned from certain school events. The program appears to reduce violent incidents by 20%, but disproportionately flags students from minority backgrounds and those with autism or ADHD. Students and parents aren't told when someone is flagged.`,
        prompt: "Does the school context (minors, educational setting, preventive support) change your view on predictive risk assessment compared to criminal justice?"
    },
    6: { // Climate & AI callback
        title: "Quantum Computing for Fusion Energy",
        context: `Your lab can use quantum computing to accelerate fusion energy research, potentially achieving breakthrough clean energy within 5 years instead of 15. However, the quantum computers require massive energy consumption (equivalent to a small city) and use rare earth minerals extracted through environmentally destructive mining. Running the simulations would produce carbon emissions equal to 50,000 people's annual footprint. Success would eventually provide unlimited clean energy; failure means those emissions achieved nothing.`,
        prompt: "How does the potential for solving climate change (rather than just saving lives) affect your reasoning about short-term environmental costs?"
    }
};
