import React, { FC, Fragment, useEffect, useRef, useState } from 'react';
import { messages as td_messages } from '@/assets/data/test';
import Markdown from '@/components/Markdown';

import { ReactComponent as SendWhiteIcon } from '@/assets/icons/send-white.svg';
import { ReactComponent as StopIcon } from '@/assets/icons/pause.svg';
import { ReactComponent as BottomIcon } from '@/assets/icons/bottom.svg';
import { ReactComponent as SettingsIcon } from '@/assets/icons/chat-settings.svg';
import { ReactComponent as LightIcon } from '@/assets/icons/light.svg';
import { ReactComponent as DarkIcon } from '@/assets/icons/dark.svg';
import { ReactComponent as AutoIcon } from '@/assets/icons/auto.svg';
import { ReactComponent as PromptIcon } from '@/assets/icons/prompt.svg';
import { ReactComponent as MaskIcon } from '@/assets/icons/mask.svg';
import { ReactComponent as BreakIcon } from '@/assets/icons/break.svg';
import { ReactComponent as RobotIcon } from '@/assets/icons/robot.svg';

import styles from './index.module.scss';
import { Input } from 'antd';
import { useMobileScreen } from '@/utils/utils';
import { IconButton } from '@/components/Button';
import classNames from 'classnames';

const PromptHints: FC = (props) => {
  return <div>{/* PromptHints */}</div>;
};

const ChatAction: FC<{ text: string; icon: JSX.Element; onClick: () => void }> = (props) => {
  const iconRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState({
    full: 16,
    icon: 16
  });

  function updateWidth() {
    if (!iconRef.current || !textRef.current) return;
    const getWidth = (dom: HTMLDivElement) => dom.getBoundingClientRect().width;
    const textWidth = getWidth(textRef.current);
    const iconWidth = getWidth(iconRef.current);
    setWidth({
      full: textWidth + iconWidth,
      icon: iconWidth
    });
  }

  return (
    <div
      className={classNames(styles['chat-input-action'], 'clickable')}
      onClick={() => {
        props.onClick();
        setTimeout(updateWidth, 1);
      }}
      onMouseEnter={updateWidth}
      onTouchStart={updateWidth}
      style={
        {
          '--icon-width': `${width.icon}px`,
          '--full-width': `${width.full}px`
        } as React.CSSProperties
      }
    >
      <div ref={iconRef} className={styles['icon']}>
        {props.icon}
      </div>
      <div ref={textRef} className={styles['text']}>
        {props.text}
      </div>
    </div>
  );
};

function useScrollToBottom() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  function scrollDomToBottom() {
    const dom = scrollRef.current;
    if (dom) {
      requestAnimationFrame(() => {
        setAutoScroll(true);
        dom.scrollTo(0, dom.scrollHeight);
      });
    }
  }

  useEffect(() => {
    if (autoScroll) {
      scrollDomToBottom();
    }
  });

  return {
    scrollRef,
    autoScroll,
    setAutoScroll,
    scrollDomToBottom
  };
}

const ChatActions: FC<{
  scrollToBottom: () => void;
}> = (props) => {
  return (
    <div className={styles['chat-input-actions']}>
      <ChatAction
        onClick={() => {
          console.log('停止响应');
        }}
        text={'停止响应'}
        icon={<StopIcon />}
      />
      <ChatAction onClick={props.scrollToBottom} text={'滚到最新'} icon={<BottomIcon />} />
      <ChatAction
        onClick={() => {
          console.log('对话设置');
        }}
        text={'对话设置'}
        icon={<SettingsIcon />}
      />
      <ChatAction
        onClick={() => {
          console.log('主题切换');
        }}
        text={'主题切换'}
        icon={<AutoIcon />}
      />
      <ChatAction
        onClick={() => {
          console.log('快捷指令');
        }}
        text={'快捷指令'}
        icon={<PromptIcon />}
      />
      <ChatAction
        onClick={() => {
          console.log('所有面具');
        }}
        text={'所有面具'}
        icon={<MaskIcon />}
      />
      <ChatAction
        onClick={() => {
          console.log('清除聊天');
        }}
        text={'清除聊天'}
        icon={<BreakIcon />}
      />
      <ChatAction
        onClick={() => {
          console.log('模型选择');
        }}
        text={'模型选择'}
        icon={<RobotIcon />}
      />
    </div>
  );
};

const Chat: FC = () => {
  const [messages, setMessages] = useState(td_messages);

  const [userInput, setUserInput] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { scrollRef, setAutoScroll, scrollDomToBottom } = useScrollToBottom();
  const isMobileScreen = useMobileScreen();

  function onInput(text: string) {
    console.log('onInput');
    setUserInput(text);
  }

  function doSubmit(userInput: string) {
    console.log(userInput);
  }

  function onInputKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    console.log('onInputKeyDown');
  }

  function scrollToBottom() {
    scrollDomToBottom();
  }

  return (
    <div className={styles['chat']}>
      <div className="window-header">
        <div className="text-[20px] font-bold max-w-[50vw]">
          <div>window-header-main-title</div>
          <div>window-header-sub-title</div>
        </div>
        <div>window-actions</div>
      </div>

      <div ref={scrollRef} className={styles['chat-body']}>
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
        <ChatActions scrollToBottom={scrollToBottom} />
        <div className={styles['chat-input-panel-inner']}>
          <Input.TextArea
            ref={inputRef}
            className={styles['chat-input']}
            placeholder="Ctrl + Enter 发送，/ 触发补全，: 触发命令"
            value={userInput}
            onInput={(e) => onInput(e.currentTarget.value)}
            onKeyDown={onInputKeyDown}
            onClick={scrollToBottom}
            onFocus={scrollToBottom}
            autoSize={{ minRows: 2 + Number(!isMobileScreen), maxRows: 20 }}
            autoFocus={!isMobileScreen}
          />
          <IconButton
            type="primary"
            className={styles['chat-input-send']}
            icon={<SendWhiteIcon />}
            text={'发送'}
            onClick={() => doSubmit(userInput)}
          ></IconButton>
        </div>
      </div>
    </div>
  );
};

export default Chat;
