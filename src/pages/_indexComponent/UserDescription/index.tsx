import clsx from 'clsx';
import { ReactNode } from 'react';

export interface UserDescProps {
  avatar: string | ReactNode;
  avatarSize?: number;
  avatarRadius?: number;
  name: string;
  description?: string;
  className?: string;
  children?: ReactNode;
  vertical?: boolean;
}

function renderAvatar(avatar: UserDescProps['avatar'], size = 40, radius = 0) {
  return typeof avatar === 'string' ? (
    <img
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: `${radius}px`
      }}
      src={avatar}
      alt="avatar"
    />
  ) : (
    avatar
  );
}

export default function UserDescription(props: UserDescProps) {
  const withDirection = (className: string) =>
    (props.vertical ? 'flex-col ' : 'flex-row ') + className;
  return (
    <div
      className={clsx(
        withDirection('flex gap-4 items-center text-base'),
        props.className ?? ''
      )}>
      {renderAvatar(props.avatar, props.avatarSize, props.avatarRadius)}
      <div className={clsx('flex flex-col leading-5', props.vertical ? 'gap-3' : 'gap-1')}>
        <span className="font-semibold">{props.name}</span>
        {props.description ? <span className="text-gray-400">{props.description}</span> : null}
      </div>
    </div>
  );
}
