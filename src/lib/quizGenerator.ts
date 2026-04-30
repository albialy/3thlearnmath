import { QuizQuestion } from '../components/ComprehensiveQuiz';

const usedQuestions = new Set<string>();

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const shuffleOptions = (correct: string, w1: string, w2: string, w3: string) => {
  const opts = [correct, w1, w2, w3];
  const shuffled = opts.map(val => ({ val, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(a => a.val);
  return {
    options: shuffled,
    correctAnswer: shuffled.indexOf(correct)
  };
};

export function generateMixedQuiz(): QuizQuestion[] {
  const result: QuizQuestion[] = [];
  const topics = [
    'FractionsConcept', 
    'FractionsGroup', 
    'EquivalentFractions', 
    'CompareFractions', 
    'Division', 
    'Area', 
    'Perimeter', 
    'Time', 
    'Patterns', 
    'BasicMath'
  ];
  
  let attempts = 0;
  
  while (result.length < 10 && attempts < 1000) {
    attempts++;
    const topic = topics[randomInt(0, topics.length - 1)];
    const qType = Math.random();
    
    let questionText = "";
    let finalOptions: string[] = [];
    let finalCorrectAnswer = -1;
    
    if (topic === 'FractionsConcept') {
      const denom = randomInt(3, 10);
      const num = randomInt(1, denom - 1);
      if (qType > 0.5) {
        const { options, correctAnswer } = shuffleOptions(
          `الأجزاء الملونة`, `العدد الكلي للأجزاء`, `نصف الشكل`, `لا شيء مما سبق`
        );
        questionText = `في الكسر ${num}/${denom}، ماذا يمثل العدد ${num}؟`;
        finalOptions = options; finalCorrectAnswer = correctAnswer;
      } else {
        const { options, correctAnswer } = shuffleOptions(
          `${num}/${denom}`, `${denom}/${num}`, `${num + 1}/${denom}`, `${num}/${denom + 1}`
        );
        questionText = `أي كسر يمثل ${num} أجزاء من ${denom} أجزاء متساوية؟`;
        finalOptions = options; finalCorrectAnswer = correctAnswer;
      }
    } else if (topic === 'FractionsGroup') {
      const total = randomInt(5, 12);
      const target = randomInt(1, total - 1);
      const items = ['حمراء', 'خضراء', 'زرقاء', 'صفراء'];
      const targetColor = items[randomInt(0, items.length - 1)];
      const { options, correctAnswer } = shuffleOptions(
        `${target}/${total}`, `${total}/${target}`, `${target}/${total + 1}`, `${target + 1}/${total}`
      );
      questionText = `إذا كان لديك ${total} كرات، منها ${target} كرات ${targetColor}، ما الكسر الذي يمثل الكرات ال${targetColor}؟`;
      finalOptions = options; finalCorrectAnswer = correctAnswer;
    } else if (topic === 'EquivalentFractions') {
      const num = randomInt(1, 4);
      const denom = randomInt(num + 1, 6);
      const mult = randomInt(2, 4);
      const { options, correctAnswer } = shuffleOptions(
        `${num * mult}/${denom * mult}`, `${num + 1}/${denom + 1}`, `${num * mult}/${denom}`, `${num}/${denom * mult}`
      );
      questionText = `أي كسر مما يلي يكافئ الكسر ${num}/${denom}؟`;
      finalOptions = options; finalCorrectAnswer = correctAnswer;
    } else if (topic === 'CompareFractions') {
      const denom = randomInt(5, 10);
      const num1 = randomInt(1, denom - 2);
      const num2 = num1 + 1;
      const { options, correctAnswer } = shuffleOptions(
        `${num2}/${denom}`, `${num1}/${denom}`, `متساويان`, `لا يمكن المعرفة`
      );
      questionText = `أي الكسرين أكبر: ${num1}/${denom} أم ${num2}/${denom}؟`;
      finalOptions = options; finalCorrectAnswer = correctAnswer;
    } else if (topic === 'Division') {
      const a = randomInt(2, 10);
      const b = randomInt(2, 10);
      const prod = a * b;
      const { options, correctAnswer } = shuffleOptions(
        `${a}`, `${a + 1}`, `${a - 1}`, `${b + 1}`
      );
      questionText = `ما هو ناتج قسمة ${prod} ÷ ${b}؟`;
      finalOptions = options; finalCorrectAnswer = correctAnswer;
    } else if (topic === 'Area') {
      const l = randomInt(3, 10);
      const w = randomInt(2, 8);
      const { options, correctAnswer } = shuffleOptions(
        `${l * w}`, `${l + w}`, `${(l + w) * 2}`, `${l * w + 1}`
      );
      questionText = `مستطيل طوله ${l} وعرضه ${w}، ما هي مساحته؟`;
      finalOptions = options; finalCorrectAnswer = correctAnswer;
    } else if (topic === 'Perimeter') {
      const l = randomInt(3, 10);
      const w = randomInt(2, 8);
      const { options, correctAnswer } = shuffleOptions(
        `${(l + w) * 2}`, `${l * w}`, `${l + w}`, `${(l + w) * 2 + 2}`
      );
      questionText = `مستطيل طوله ${l} وعرضه ${w}، ما هو محيطه؟`;
      finalOptions = options; finalCorrectAnswer = correctAnswer;
    } else if (topic === 'Time') {
      if (qType > 0.5) {
        const hours = randomInt(2, 5);
        const { options, correctAnswer } = shuffleOptions(
          `${hours * 60}`, `${hours * 24}`, `${hours * 3600}`, `${hours * 100}`
        );
        questionText = `كم دقيقة في ${hours} ساعات؟`;
        finalOptions = options; finalCorrectAnswer = correctAnswer;
      } else {
        const weeks = randomInt(2, 5);
        const { options, correctAnswer } = shuffleOptions(
          `${weeks * 7}`, `${weeks * 30}`, `${weeks * 12}`, `${weeks * 24}`
        );
        questionText = `كم يوماً في ${weeks} أسابيع؟`;
        finalOptions = options; finalCorrectAnswer = correctAnswer;
      }
    } else if (topic === 'Patterns') {
      const start = randomInt(2, 15);
      const step = randomInt(2, 5);
      const num1 = start;
      const num2 = start + step;
      const num3 = start + step * 2;
      const num4 = start + step * 3;
      const { options, correctAnswer } = shuffleOptions(
        `${num4}`, `${num4 + 1}`, `${num4 - 1}`, `${num4 + step}`
      );
      questionText = `ما هو العدد التالي في النمط: ${num1}، ${num2}، ${num3}، ...؟`;
      finalOptions = options; finalCorrectAnswer = correctAnswer;
    } else {
      // BasicMath
      const type = randomInt(1, 3);
      if (type === 1) {
        const a = randomInt(10, 50);
        const b = randomInt(10, 50);
        const { options, correctAnswer } = shuffleOptions(`${a + b}`, `${a + b + 10}`, `${a + b - 5}`, `${Math.max(a,b)}`);
        questionText = `ما هو ناتج جمع ${a} + ${b}؟`;
        finalOptions = options; finalCorrectAnswer = correctAnswer;
      } else if (type === 2) {
        const a = randomInt(5, 12);
        const b = randomInt(2, 9);
        const { options, correctAnswer } = shuffleOptions(`${a * b}`, `${a * b + 2}`, `${a * b - 3}`, `${a + b}`);
        questionText = `ما هو حاصل ضرب ${a} × ${b}؟`;
        finalOptions = options; finalCorrectAnswer = correctAnswer;
      } else {
        const a = randomInt(20, 90);
        const b = randomInt(10, a - 5);
        const { options, correctAnswer } = shuffleOptions(`${a - b}`, `${a - b + 5}`, `${a - b - 5}`, `${a}`);
        questionText = `ما هو ناتج طرح ${a} - ${b}؟`;
        finalOptions = options; finalCorrectAnswer = correctAnswer;
      }
    }
    
    if (!usedQuestions.has(questionText)) {
      usedQuestions.add(questionText);
      result.push({
        question: questionText,
        options: finalOptions,
        correctAnswer: finalCorrectAnswer
      });
    }
  }
  
  if (result.length < 10) {
    // If we exhausted questions, clear history and allow them again for what's missing
    usedQuestions.clear();
    const needed = 10 - result.length;
    for (let i = 0; i < needed; i++) {
        // Just fill the rest without uniqueness check to guarantee 10 questions
        const a = randomInt(10, 50);
        const b = randomInt(10, 50);
        const { options, correctAnswer } = shuffleOptions(`${a + b}`, `${a + b + 10}`, `${a + b - 5}`, `${Math.max(a,b)}`);
        result.push({ question: `ما هو ناتج جمع ${a} + ${b}؟`, options, correctAnswer });
    }
  }
  
  return result;
}
