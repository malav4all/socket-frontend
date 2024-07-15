import React, { useState, useEffect } from "react";

const App: React.FC = () => {
  const [connectionType, setConnectionType] = useState<"tcpip" | "serial">(
    "tcpip"
  );
  const [activeTab, setActiveTab] = useState<"LIS1A" | "Manual">("LIS1A");
  const [ip, setIp] = useState("127.0.0.1");
  const [port, setPort] = useState("8080");
  const [useAsServer, setUseAsServer] = useState(false);
  const [fixedFrameSize, setFixedFrameSize] = useState(240);

  const [serialPort, setSerialPort] = useState("COM1");
  const [baudRate, setBaudRate] = useState("9600");
  const [dataBits, setDataBits] = useState("8");
  const [parity, setParity] = useState("None");
  const [stopBits, setStopBits] = useState("1");
  const [flowControl, setFlowControl] = useState("None");

  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [log, setLog] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (socket) {
      socket.onopen = () => {
        console.log("Socket connected successfully");
        setLog((prevLog) => [...prevLog, "Connected to server"]);
      };

      socket.onmessage = (event) => {
        console.log("Message received from server:", event.data);
        setLog((prevLog) => [...prevLog, `Received: ${event.data}`]);
      };

      socket.onclose = () => {
        console.log("Socket disconnected");
        setLog((prevLog) => [...prevLog, "Disconnected from server"]);
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        setLog((prevLog) => [...prevLog, `WebSocket error: ${error}`]);
      };
    }
  }, [socket]);

  const connectToServer = () => {
    const ws = new WebSocket(`ws://${ip}:${port}/ws`);
    setSocket(ws);
  };

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
      console.log("Message sent:", message);
      setLog((prevLog) => [...prevLog, `Sent: ${message}`]);
      setMessage("");
    } else {
      console.log("Socket is not connected");
      setLog((prevLog) => [...prevLog, "Socket is not connected"]);
    }
  };

  return (
    <div className="p-4 bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl overflow-y-auto">
        <div className="flex mb-4">
          <div className="border p-2">
            <div className="mb-2">
              <input
                type="radio"
                name="type"
                checked={connectionType === "tcpip"}
                onChange={() => setConnectionType("tcpip")}
                className="mr-2"
              />
              <label>TCP/IP</label>
            </div>
            <div>
              <input
                type="radio"
                name="type"
                checked={connectionType === "serial"}
                onChange={() => setConnectionType("serial")}
                className="mr-2"
              />
              <label>Serial</label>
            </div>
          </div>

          {connectionType === "tcpip" && (
            <div className="border p-2 ml-4 flex-grow">
              <div className="flex items-center mb-4">
                <label className="w-24">IP:</label>
                <input
                  type="text"
                  value={ip}
                  onChange={(e) => setIp(e.target.value)}
                  className="p-1 border rounded flex-grow"
                />
              </div>
              <div className="flex items-center mb-4">
                <label className="w-24">Port:</label>
                <input
                  type="text"
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                  className="p-1 border rounded flex-grow"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={useAsServer}
                  onChange={() => setUseAsServer(!useAsServer)}
                  className="mr-2"
                />
                <label>Use as Server</label>
              </div>
            </div>
          )}

          {connectionType === "serial" && (
            <div className="border p-2 ml-4 flex-grow">
              <div className="flex items-center mb-4">
                <label className="w-24">Port:</label>
                <select
                  value={serialPort}
                  onChange={(e) => setSerialPort(e.target.value)}
                  className="p-1 border rounded flex-grow"
                >
                  <option value="COM1">COM1</option>
                  <option value="COM2">COM2</option>
                  <option value="COM3">COM3</option>
                </select>
              </div>
              <div className="flex items-center mb-4">
                <label className="w-24">Baud:</label>
                <select
                  value={baudRate}
                  onChange={(e) => setBaudRate(e.target.value)}
                  className="p-1 border rounded flex-grow"
                >
                  <option value="9600">9600</option>
                  <option value="14400">14400</option>
                  <option value="19200">19200</option>
                </select>
              </div>
              <div className="flex items-center mb-4">
                <label className="w-24">Data Bits:</label>
                <select
                  value={dataBits}
                  onChange={(e) => setDataBits(e.target.value)}
                  className="p-1 border rounded flex-grow"
                >
                  <option value="8">8</option>
                  <option value="7">7</option>
                </select>
              </div>
              <div className="flex items-center mb-4">
                <label className="w-24">Parity:</label>
                <select
                  value={parity}
                  onChange={(e) => setParity(e.target.value)}
                  className="p-1 border rounded flex-grow"
                >
                  <option value="None">None</option>
                  <option value="Even">Even</option>
                  <option value="Odd">Odd</option>
                </select>
              </div>
              <div className="flex items-center mb-4">
                <label className="w-24">Stop Bits:</label>
                <select
                  value={stopBits}
                  onChange={(e) => setStopBits(e.target.value)}
                  className="p-1 border rounded flex-grow"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
              <div className="flex items-center mb-4">
                <label className="w-24">Flow Control:</label>
                <select
                  value={flowControl}
                  onChange={(e) => setFlowControl(e.target.value)}
                  className="p-1 border rounded flex-grow"
                >
                  <option value="None">None</option>
                  <option value="XON/XOFF">XON/XOFF</option>
                  <option value="RTS/CTS">RTS/CTS</option>
                </select>
              </div>
            </div>
          )}

          <div className="ml-4 flex flex-col justify-between">
            <button
              className="bg-blue-500 text-white px-4 py-2 mb-2 rounded"
              onClick={connectToServer}
            >
              Connect
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded"
              onClick={() => socket?.close()}
            >
              Disconnect
            </button>
          </div>
        </div>

        <div className="border-t mt-4 pt-4">
          <div className="flex mb-4">
            <button
              className={`mr-4 px-4 py-2 ${
                activeTab === "LIS1A"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              } rounded`}
              onClick={() => setActiveTab("LIS1A")}
            >
              LIS1A
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "Manual"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              } rounded`}
              onClick={() => setActiveTab("Manual")}
            >
              Manual
            </button>
          </div>

          {activeTab === "LIS1A" && (
            <div className="p-4 border rounded">
              <div className="mb-4">
                <button
                  className="bg-gray-300 text-black px-4 py-2 rounded"
                  disabled
                >
                  Send
                </button>
              </div>
              <div className="flex items-center mb-4">
                <input type="radio" name="simulate" className="mr-2" />
                <label>Simulate Instrument</label>
                <input type="radio" name="simulate" className="ml-4 mr-2" />
                <label>Simulate Host</label>
              </div>
              <div className="flex items-center mb-4">
                <input type="radio" name="frame" className="mr-2" />
                <label>Use Fixed Frame Size</label>
                <input
                  type="number"
                  value={fixedFrameSize}
                  onChange={(e) => setFixedFrameSize(parseInt(e.target.value))}
                  className="ml-2 p-1 border rounded w-16"
                />
              </div>
              <div className="flex items-center mb-4">
                <input type="radio" name="frame" className="mr-2" />
                <label>Use a Frame for each Record</label>
              </div>
              <div className="flex flex-col mb-4">
                <textarea
                  className="border p-2 mb-2 h-32"
                  placeholder="First space content"
                ></textarea>
                <textarea
                  className="border p-2 h-32"
                  placeholder="Second space content"
                ></textarea>
              </div>
            </div>
          )}

          {activeTab === "Manual" && (
            <div className="p-4 border rounded overflow-y-auto h-96">
              <div className="flex mb-4">
                <div className="mr-4">
                  <label>Character List:</label>
                  <select className="p-2 border rounded ml-2">
                    <option value="<NUL>">&lt;NUL&gt; 0</option>
                    <option value="<SOH>">&lt;SOH&gt; 1</option>
                    <option value="<STX>">&lt;STX&gt; 2</option>
                  </select>
                </div>
                <div className="mr-4">
                  <label>Start String:</label>
                  <input type="text" className="p-2 border rounded ml-2" />
                </div>
                <div>
                  <label>End String:</label>
                  <input type="text" className="p-2 border rounded ml-2" />
                </div>
              </div>
              <div className="flex items-center mb-4">
                <input type="checkbox" className="mr-2" />
                <label>Old ASTM</label>
                <input type="checkbox" className="ml-4 mr-2" />
                <label>Checksum</label>
              </div>
              <div className="flex mb-4">
                <label>Include:</label>
                <select className="p-2 border rounded ml-2">
                  <option value="Both Start and End">Both Start and End</option>
                </select>
              </div>
              <div className="flex mb-4">
                <label>Checksum:</label>
                <select className="p-2 border rounded ml-2">
                  <option value="AddMod256">AddMod256</option>
                </select>
              </div>
              <div className="flex mb-4">
                <button
                  className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
                  disabled
                >
                  Clear
                </button>
              </div>
              <div className="flex mb-4">
                <div className="mr-4">
                  <button
                    className="bg-gray-300 text-black px-4 py-2 rounded"
                    onClick={sendMessage}
                  >
                    Sent
                  </button>
                </div>
                <div>
                  <button className="bg-gray-300 text-black px-4 py-2 rounded">
                    Received
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <textarea
                  className="border p-2 mb-2 h-32 w-full"
                  placeholder="Sent content"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-4">
                <textarea
                  className="border p-2 h-32 w-full"
                  placeholder="Received content"
                  value={log.join("\n")}
                  readOnly
                ></textarea>
              </div>
              <div className="flex items-center mb-4">
                <label className="w-24">Disconnected</label>
                <input type="text" className="p-2 border rounded ml-2 w-16" />
                <button
                  className="bg-gray-300 text-black px-4 py-2 rounded ml-2"
                  disabled
                >
                  Send Line
                </button>
                <input type="text" className="p-2 border rounded ml-2 w-16" />
                <button
                  className="bg-gray-300 text-black px-4 py-2 rounded ml-2"
                  disabled
                >
                  Send Char(s)
                </button>
              </div>
              <div className="flex items-center mb-4">
                <button
                  className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
                  disabled
                >
                  Send Memo
                </button>
                <button
                  className="bg-gray-300 text-black px-4 py-2 rounded"
                  disabled
                >
                  Load Input
                </button>
              </div>
              <div className="flex flex-wrap">
                {[
                  "NULL",
                  "SOH",
                  "STX",
                  "ETX",
                  "EOT",
                  "ENQ",
                  "ACK",
                  "BEL",
                  "BS",
                  "HT",
                  "LF",
                  "VT",
                  "FF",
                  "CR",
                  "SO",
                  "SI",
                  "DLE",
                  "DC1",
                  "DC2",
                  "DC3",
                  "DC4",
                  "NAK",
                  "SYN",
                  "ETB",
                  "CAN",
                  "EM",
                  "SUB",
                  "ESC",
                  "FS",
                  "GS",
                  "RS",
                  "US",
                ].map((char) => (
                  <button
                    key={char}
                    className="bg-gray-300 text-black px-4 py-2 rounded m-1"
                    disabled
                  >
                    {char}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
