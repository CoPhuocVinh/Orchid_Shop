function Note() {
  return (
    <div className="p-8 bg-white dark:bg-darkblack-600 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-base font-bold text-bgray-900 dark:text-white">
          Note
        </h4>
        <button
          aria-label="none"
          className="text-sm font-medium text-success-300"
        >
          Edit
        </button>
      </div>
      <div>
        <p className="text-base font-medium text-bgray-600">
          No notes from customer
        </p>
      </div>
    </div>
  );
}

export default Note;
