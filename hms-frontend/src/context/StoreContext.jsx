// phần này để lưu trữ data dùng trong cả chương trình
// search thêm gg để biết thêm chi tiết, nma hiện tại phần này chưa sử dụng
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const contextValue = {};
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;