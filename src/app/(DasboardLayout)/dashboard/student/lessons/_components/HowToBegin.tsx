const steps = [
  {
    id: 1,
    title: "Step 1: Book Your First Class",
    description:
      "Use your class credits to book a session with one of our English teachers through the Teachers or Calendar sidebar. In “Calendar,” choose your desired time and then select an available teacher. In “Teachers,” choose a teacher first and then book based on their availability.",
  },
  {
    id: 2,
    title: "Step 2: Join Class",
    description:
      "At the time of your class, go to the “My Booking” sidebar. Under “Upcoming Classes,” you will find your scheduled class and a “Join Class” button. Click the button to join the meeting.",
  },
  {
    id: 3,
    title: "Step 3: Complete Lessons",
    description:
      "Work through structured lessons with your teacher during Google Meet sessions. After each class, your teacher will unlock the grammar presentation along with the accompanying practice exercises to be completed as homework.",
  },
  {
    id: 4,
    title: "Step 4: Practice",
    description:
      "Complete the provided practice exercises between classes to reinforce your learning. Additional resources can be found in the “Resources” tab.",
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
