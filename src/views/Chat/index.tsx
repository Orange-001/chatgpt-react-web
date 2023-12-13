import React, { FC } from 'react';

const Chat: FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center relative border border-solid border-[rgba(0,0,0,0.1)]]">
        chat-header
      </div>

      <div className="flex-1 overflow-x-hidden overflow-y-auto p-[20px] pb-[40px] relative overscroll-none">
        chat-body
      </div>

      <div className="relative w-full p-[20px] pt-[10px] box-border border-t-[1px] border-solid border-[rgb(222, 222, 222)] shadow-[var(--card-shadow)]">
        chat-input-panel
      </div>

      {/* <button className="text-[var(--test-text-color)]">test</button> */}
    </div>
  );
};

export default Chat;
