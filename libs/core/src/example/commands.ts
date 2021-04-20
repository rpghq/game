import { command, source, fetch, target, Handler } from '../executor';
import { Administrator, Player, Playing } from './components';

export const KickPlayer = command(
  source([Player, Administrator]),
  {
    connectedAdmins: fetch([Administrator, Playing]),
    target: target([Player, Playing], [Administrator]),
    reason: String,
  },
  { carteirada: Boolean },
);

export const kickPlayerHandler: Handler<typeof KickPlayer> = (source, { target, reason }) => {
  const sourceLevel = source.get(Administrator).level;
  const targetLevel = target.get(Administrator).level;

  if (targetLevel > sourceLevel) {
    return { success: false, message: 'impossível', carteirada: true };
  }

  return { success: true, message: reason, carteirada: false };
};
