interface IModalProps {
  title: string;
  description: string;
  cancelAction: any;
}

const NotificationModal = ({
  title,
  description,
  cancelAction,
}: IModalProps) => {
  return (
    <div
      onClick={cancelAction}
      className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 w-full overflow-hidden"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="bg-white p-4 rounded-xl w-[90vw] desktop:w-[50vw]"
      >
        <div className="font-bold text-2xl">{title}</div>
        <div>{description}</div>
      </div>
    </div>
  );
};

export default NotificationModal;
