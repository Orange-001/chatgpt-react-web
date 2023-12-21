import React, { FC, Fragment, useState } from 'react';
import { messages as td_messages } from '@/assets/data/test';
import Markdown from '@/components/Markdown';

import styles from './index.module.scss';
import { Input } from 'antd';

const PromptHints: FC = (props) => {
  return <div>PromptHints</div>;
};
const ChatActions: FC = (props) => {
  return <div>ChatActions</div>;
};

const Chat: FC = () => {
  const [messages, setMessages] = useState(td_messages);

  const [userInput, setUserInput] = useState('');

  return (
    <div className={styles['chat']}>
      <div className="window-header">
        <div className="text-[20px] font-bold max-w-[50vw]">
          <div>window-header-main-title</div>
          <div>window-header-sub-title</div>
        </div>
        <div>window-actions</div>
      </div>

      <div className={styles['chat-body']}>
        {messages.map((message, i) => {
          const isUser = message.role === 'user';

          return (
            <Fragment key={i}>
              <div className={isUser ? styles['chat-message-user'] : styles['chat-message']}>
                <div className={styles['chat-message-container']}>
                  <div className={styles['chat-message-header']}>{message.role}</div>
                  <div className={styles['chat-message-item']}>
                    <Markdown
                      content={message.content}
                      loading={message.streaming && message.content.length === 0 && !isUser}
                    />
                  </div>
                  <div className={styles['chat-message-action-date']}>{message.date.toString()}</div>
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>

      <div className={styles['chat-input-panel']}>
        <PromptHints />
        <ChatActions />
        <div className={styles['chat-input-panel-inner']}>
          <textarea
            className={styles['chat-input']}
            placeholder="Ctrl + Enter 发送，/ 触发补全，: 触发命令"
            value={userInput}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
