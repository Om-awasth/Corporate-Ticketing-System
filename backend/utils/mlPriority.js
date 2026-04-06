import { pipeline, env } from '@xenova/transformers';

// Optional: Disable local models to fetch directly from HuggingFace Hub on first run
env.allowLocalModels = false;
env.useBrowserCache = false; 

let classifier;

/**
 * Singleton to get our zero-shot classification model.
 * Loads lazily on the first request.
 */
export async function getClassifier() {
  if (!classifier) {
    console.log('--- Loading ML model for priority prediction... ---');
    // Using MobileBERT MNLI for lightweight zero-shot classification offline in Node
    classifier = await pipeline('zero-shot-classification', 'Xenova/mobilebert-uncased-mnli');
    console.log('--- ML model loaded successfully ---');
  }
  return classifier;
}

/**
 * Predicts whether a support ticket is Low, Medium, or High priority
 * based on its title and description using Deep Learning.
 */
export async function predictTicketPriority(title, description) {
  try {
    const model = await getClassifier();
    const textToAnalyze = `Ticket Subject: ${title}. Description: ${description}.`;
    
    // Provide clean, distinct labels
    const candidateLabels = ['emergency critical high priority', 'standard normal medium priority', 'trivial minor low priority'];
    
    // Add hypothesis template to give the model context
    const result = await model(textToAnalyze, candidateLabels, {
      hypothesis_template: 'The urgency and severity of this IT helpdesk ticket is {}.'
    });
    
    console.log('--- ML Prediction Scores ---');
    console.log(result.labels.map((label, i) => `${label}: ${(result.scores[i] * 100).toFixed(1)}%`));
    
    // Extract the highest scoring label
    const topLabel = result.labels[0];
    
    if (topLabel.includes('high priority')) return 'High';
    if (topLabel.includes('low priority')) return 'Low';
    
    return 'Medium';
  } catch (error) {
    console.error('Error predicting priority with ML model:', error);
    // Fallback to Medium if the ML model fails for any reason
    return 'Medium';
  }
}
