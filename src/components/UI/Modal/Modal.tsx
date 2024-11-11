interface IModalProps {
  title: string;
  description: string;
  confirmAction: any;
  cancelAction: any;
}

const Modal = ({
  title,
  description,
  confirmAction,
  cancelAction,
}: IModalProps) => {
  return (
    <div
      onClick={cancelAction}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 w-full overflow-hidden"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="bg-white p-4 rounded-xl w-[90vw] desktop:w-[50vw]"
      >
        <div className="font-bold text-2xl">{title}</div>
        <div>{description}</div>
        <div className="flex flex-row justify-end items-center w-full gap-4 mt-8 text-lg">
          <button
            className="px-2 py-1 border-2 border-sky-400 rounded-lg hover:brightness-75"
            onClick={cancelAction}
          >
            Cancel
          </button>
          <button
            className="bg-sky-400 text-white font-bold px-2 py-1 rounded-lg hover:brightness-75"
            onClick={confirmAction}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
