import React, { useState } from "react";

const App = () => {
  const [connectionType, setConnectionType] = useState("tcpip");
  const [ip, setIp] = useState("127.0.0.1");
  const [port, setPort] = useState("9990");
  const [useAsServer, setUseAsServer] = useState(false);
  const [fixedFrameSize, setFixedFrameSize] = useState(240);

  const [serialPort, setSerialPort] = useState("COM1");
  const [baudRate, setBaudRate] = useState("9600");
  const [dataBits, setDataBits] = useState("8");
  const [parity, setParity] = useState("None");
  const [stopBits, setStopBits] = useState("1");
  const [flowControl, setFlowControl] = useState("None");

  return (
    <div className="p-4 bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <div className="flex mb-4">
          <div className="mr-4">
            <label className="mr-2">
              <input
                type="radio"
                name="type"
                checked={connectionType === "tcpip"}
                onChange={() => setConnectionType("tcpip")}
                className="mr-2"
              />
              TCP/IP
            </label>
            <label className="ml-4">
              <input
                type="radio"
                name="type"
                checked={connectionType === "serial"}
                onChange={() => setConnectionType("serial")}
                className="mr-2"
              />
              Serial
            </label>
          </div>
        </div>

        {connectionType === "tcpip" && (
          <div className="mb-4 p-4 border rounded">
            <div className="flex items-center mb-4">
              <label className="w-24">IP:</label>
              <input
                type="text"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                className="p-2 border rounded flex-grow"
              />
            </div>
            <div className="flex items-center mb-4">
              <label className="w-24">Port:</label>
              <input
                type="text"
                value={port}
                onChange={(e) => setPort(e.target.value)}
                className="p-2 border rounded flex-grow"
              />
            </div>
            <div className="flex items-center mb-4">
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
          <div className="mb-4 p-4 border rounded">
            <div className="flex items-center mb-4">
              <label className="w-24">Port:</label>
              <select
                value={serialPort}
                onChange={(e) => setSerialPort(e.target.value)}
                className="p-2 border rounded flex-grow"
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
                className="p-2 border rounded flex-grow"
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
                className="p-2 border rounded flex-grow"
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
                className="p-2 border rounded flex-grow"
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
                className="p-2 border rounded flex-grow"
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
                className="p-2 border rounded flex-grow"
              >
                <option value="None">None</option>
                <option value="XON/XOFF">XON/XOFF</option>
                <option value="RTS/CTS">RTS/CTS</option>
              </select>
            </div>
          </div>
        )}

        <div className="flex mb-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
            Connect
          </button>
          <button className="bg-gray-400 text-white px-4 py-2 rounded" disabled>
            Disconnect
          </button>
        </div>

        <div className="flex mb-4">
          <div className="mr-8">
            <label className="mr-2">
              <input type="radio" name="simulation" className="mr-2" />
              Simulate Instrument
            </label>
          </div>
          <div>
            <label className="mr-2">
              <input type="radio" name="simulation" className="mr-2" />
              Simulate Host
            </label>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <label className="mr-2">
            <input
              type="radio"
              name="frameSize"
              checked={true}
              className="mr-2"
            />
            Use Fixed Frame Size
          </label>
          <input
            type="number"
            value={fixedFrameSize}
            onChange={(e) => setFixedFrameSize(parseInt(e.target.value))}
            className="ml-2 p-1 border rounded w-16"
          />
        </div>
        <div className="flex items-center mb-4">
          <label className="mr-2">
            <input type="radio" name="frameSize" className="mr-2" />
            Use a Frame for each Record
          </label>
        </div>
      </div>
    </div>
  );
};

export default App;
