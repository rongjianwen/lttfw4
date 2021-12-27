import { PayloadAction } from '@reduxjs/toolkit';
export interface OutlinerState {
    open: boolean;
    width: number;
}
declare const slice: import("@reduxjs/toolkit").Slice<OutlinerState, {
    toggle: (state: import("immer/dist/internal").WritableDraft<OutlinerState>) => void;
    setWidth: (state: import("immer/dist/internal").WritableDraft<OutlinerState>, action: PayloadAction<any>) => void;
}, "outliner">;
export default slice;
