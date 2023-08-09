import {
  ButtonTypeEnum,
  IMessage,
  MessageActionStatusEnum,
  NotificationBell,
  PopoverNotificationCenter,
  useNotifications,
  useSocket,
  useUpdateAction,
} from "@novu/notification-center";
import { useEffect } from "react";

const Noty = () => {
  const _ = useNotifications();
  const { updateAction } = useUpdateAction();

  function handlerOnNotificationClick(message: IMessage) {
    if (message?.cta?.data?.url) {
       window.location.href = message.cta.data.url;
    }
    
  }
  async function handlerOnActionClick(
    templateIdentifier: string,
    type: ButtonTypeEnum,
    message: IMessage
  ) {
    if (templateIdentifier === "friend-request") {
      if (type === "primary") {
        await updateAction({
          messageId: message._id,
          actionButtonType: type,
          status: MessageActionStatusEnum.DONE,
        });
      }
    }
    
  }

  const { socket } = useSocket();
  useEffect(() => {
    if (socket) {
      socket.on("unseen_count_changed", (data) => {
        console.log(data,'socket');
      });
    }

    return () => {
      if (socket) {
        socket.off("unseen_count_changed");
      }
    };
  }, [socket]);

  return (
    <div>
      <PopoverNotificationCenter
        onNotificationClick={handlerOnNotificationClick}
        onActionClick={handlerOnActionClick}
        colorScheme={"light"}
        position="bottom-start"
      >
        {({ unseenCount }) => {
        return <NotificationBell unseenCount={unseenCount} />;
      }}
      </PopoverNotificationCenter>
    </div>
  );
};

export default Noty;
