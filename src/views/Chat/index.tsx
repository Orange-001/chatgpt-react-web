import React, { FC, Fragment, useState } from 'react';
import { messages as td_messages } from '@/assets/data/test';
import Markdown from '@/components/Markdown';

const Chat: FC = () => {
  const [messages, setMessages] = useState(td_messages);

  return (
    <>
      <div className="flex justify-between items-center relative">
        <div className="text-[20px] font-bold signle-line-ellipsis max-w-[50vw]">
          <div>window-header-main-title</div>
          <div>window-header-sub-title</div>
        </div>
        <div>window-actions</div>
      </div>

      <div className="flex-1 overflow-x-hidden overflow-y-auto p-[20px] pb-[40px] relative overscroll-none">
        {messages.map((message, i) => {
          return (
            <Fragment key={i}>
              <div className="mb-4">
                <div>{message.role}</div>
                <div className="markdown">
                  <Markdown content={message.content} />
                </div>
                <div>{message.date.toString()}</div>
              </div>
            </Fragment>
          );
        })}
      </div>

      <div className="relative w-full p-[20px] pt-[10px] box-border border-t-[1px] border-solid border-[#494949]">
        chat-input-panel
      </div>

      {/* <button className="text-[var(--test-text-color)]">test</button> */}
    </>
  );
};

export default Chat;
