import { Card } from '@/types/database-types';
import moment from 'moment';

export function isNew({ last_studied }: Card) {
  return !last_studied;
}

export function isLearning({ last_studied, last_completed }: Card) {
  return Boolean(last_studied) && last_studied !== last_completed;
}

export function isToReview({ last_studied, last_completed, next_study }: Card) {
  return Boolean(last_studied) && last_studied === last_completed && moment(next_study).isAfter();
}
