import { ActionType } from 'typesafe-actions';
import * as goodsActions from './goods/actions';

const allActions = {
    goodsActions,
};

export type GlobalAppActions = ActionType<typeof allActions>
