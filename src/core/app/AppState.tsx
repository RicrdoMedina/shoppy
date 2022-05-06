export interface UninitializedState {
  kind: 'uninitialized';
}

export interface InitializedState {
  kind: 'initialized';
}

export type AppState = UninitializedState | InitializedState;

export const appInitialState: AppState = {
  kind: 'uninitialized'
};
