import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
} from 'date-fns';

export const timeAgo = (date) => {
  const now = new Date();
  const minutes = differenceInMinutes(now, new Date(date));
  const hours = differenceInHours(now, new Date(date));
  const days = differenceInDays(now, new Date(date));

  if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else {
    return `${days} days ago`;
  }
};
