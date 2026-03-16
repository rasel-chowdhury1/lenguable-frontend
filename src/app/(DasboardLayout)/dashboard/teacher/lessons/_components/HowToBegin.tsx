const steps = [
  {
    id: 1,
    title: "Step 1: Book Your First Class",
    description:
      "Use your class credits to book a session with one of our native English tutors.",
  },
  {
    id: 2,
    title: "Step 2: Complete Lessons",
    description:
      "Work through structured lessons with your teacher. They'll unlock new content as you progress.",
  },
  {
    id: 3,
    title: "Step 3: Practice",
    description:
      "Complete practice exercises between classes to reinforce what you've learned.",
  },
];

export function HowToBegin() {
  return (
    <main className="flex-1 bg-white border border-gray-200 rounded-xl p-6">
      <h2 className="text-base font-semibold text-gray-800 mb-5">
        How to Begin
      </h2>
      <div className="space-y-5">
        {steps.map((step) => (
          <div key={step.id}>
            <p className="text-sm font-bold text-gray-900">{step.title}</p>
            <p className="mt-1 text-sm text-gray-500 leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
