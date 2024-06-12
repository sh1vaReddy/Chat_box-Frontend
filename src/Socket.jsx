import { createContext, useMemo, useContext } from "react";
import io from "socket.io-client";
import { server } from './constants/Config.js'

const SocketContext = createContext();

const getsocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io(server, { withCredentials: true }), []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, getsocket };