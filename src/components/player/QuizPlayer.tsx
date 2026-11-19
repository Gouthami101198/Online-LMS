import React, { useState } from 'react';
import { Quiz, QuizAttempt } from '../../types';
import { Button } from '../common/Button';
import { useAppDispatch } from '../../redux/store';
import { submitQuizAttempt } from '../../redux/slices/enrollmentSlice';
import { HelpCircle, CheckCircle, XCircle, RotateCcw, Award, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizPlayerProps {
  courseId: string;
  quiz: Quiz;
  previousAttempt?: QuizAttempt;
  onPassed?: () => void;
}

export const QuizPlayer: React.FC<QuizPlayerProps> = ({
  courseId,
  quiz,
  previousAttempt,
  onPassed,
}) => {
  const dispatch = useAppDispatch();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>(
    previousAttempt?.selectedAnswers || {}
  );
  const [isSubmitted, setIsSubmitted] = useState(!!previousAttempt);
  const [attemptResult, setAttemptResult] = useState<QuizAttempt | null>(
    previousAttempt || null
  );

  const currentQ = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    quiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctOptionIndex) {
        correctCount += 1;
      }
    });

    const scorePercent = Math.round((correctCount / totalQuestions) * 100);
    const passed = scorePercent >= quiz.passingScorePercent;

    const attempt: QuizAttempt = {
      quizId: quiz.id,
      scorePercent,
      passed,
      completedAt: new Date().toISOString().split('T')[0],
      selectedAnswers,
    };

    setAttemptResult(attempt);
    setIsSubmitted(true);
    dispatch(submitQuizAttempt({ courseId, attempt }));

    if (passed) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      if (onPassed) onPassed();
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setAttemptResult(null);
    setCurrentQuestionIndex(0);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-soft">
      {/* Quiz Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <HelpCircle size={18} />
            </span>
            <h3 className="font-bold text-slate-900 text-lg">{quiz.title}</h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Passing score: {quiz.passingScorePercent}% • Time limit: {quiz.timeLimitMinutes} mins
          </p>
        </div>

        {isSubmitted && attemptResult && (
          <div className="flex items-center gap-3">
            <div
              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 ${
                attemptResult.passed
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}
            >
              {attemptResult.passed ? <CheckCircle size={15} /> : <XCircle size={15} />}
              Score: {attemptResult.scorePercent}% ({attemptResult.passed ? 'PASSED' : 'NEEDS PRACTICE'})
            </div>
            <Button size="sm" variant="outline" onClick={handleRetake} leftIcon={<RotateCcw size={14} />}>
              Retake
            </Button>
          </div>
        )}
      </div>

      {/* Question Stepper / Progress Bar */}
      <div className="py-4">
        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
          <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
          <span>{Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-600 to-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Active Question Box */}
      <div className="py-3">
        <h4 className="text-base font-bold text-slate-900 leading-snug mb-4">
          {currentQ.question}
        </h4>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((option, optIdx) => {
            const isSelected = selectedAnswers[currentQ.id] === optIdx;
            const isCorrect = currentQ.correctOptionIndex === optIdx;

            let optionStyle = 'border-slate-200 hover:border-teal-300 hover:bg-slate-50';
            if (isSelected) {
              optionStyle = 'border-teal-600 bg-teal-50/80 text-teal-950 font-semibold';
            }
            if (isSubmitted) {
              if (isCorrect) {
                optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
              } else if (isSelected && !isCorrect) {
                optionStyle = 'border-rose-500 bg-rose-50 text-rose-950 font-medium';
              } else {
                optionStyle = 'opacity-50 border-slate-200';
              }
            }

            return (
              <div
                key={optIdx}
                onClick={() => handleSelectOption(currentQ.id, optIdx)}
                className={`p-4 rounded-xl border-2 transition-all flex items-start gap-3.5 ${
                  !isSubmitted ? 'cursor-pointer' : ''
                } ${optionStyle}`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                    isSelected
                      ? 'bg-gradient-to-r from-teal-600 to-emerald-500 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {String.fromCharCode(65 + optIdx)}
                </div>
                <span className="text-sm leading-relaxed">{option}</span>
              </div>
            );
          })}
        </div>

        {/* Explanation Card (shows after submit) */}
        {isSubmitted && (
          <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
            <span className="font-bold text-slate-900 block mb-1">Explanation:</span>
            {currentQ.explanation}
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
        <Button
          size="sm"
          variant="outline"
          disabled={currentQuestionIndex === 0}
          onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
        >
          Previous
        </Button>

        <div className="flex items-center gap-2">
          {currentQuestionIndex < totalQuestions - 1 ? (
            <Button
              size="sm"
              variant="primary"
              rightIcon={<ArrowRight size={14} />}
              onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
            >
              Next Question
            </Button>
          ) : !isSubmitted ? (
            <Button
              size="sm"
              variant="success"
              onClick={handleSubmitQuiz}
              disabled={Object.keys(selectedAnswers).length < totalQuestions}
            >
              Submit Quiz
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

