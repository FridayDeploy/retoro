import { isClient } from './isClient';

let Peer;

if (isClient) {
  Peer = require('peerjs').default;
}

export class RTCManager {
  static bootPeer(peerId) {
    return new Promise((resolve) => {
      const peer = new Peer(peerId);

      const handlePeerBooted = () => {
        peer.off('open', handlePeerBooted);
        peer.off('error', handlePeerBootFailed);

        RTCManager.peerClient = peer;
        RTCManager.connectPeerHandlers();

        RTCManager.handleOpen();

        resolve(peer);
      };

      const handlePeerBootFailed = (error) => {
        if (error.type === 'unavailable-id') {
          peer.destroy();

          RTCManager.bootPeer().then((peer) => resolve(peer));
        }
      };

      peer.on('open', handlePeerBooted);
      peer.on('error', handlePeerBootFailed);
    });
  }

  static connectPeerHandlers() {
    RTCManager.peerClient.on('error', RTCManager.handleError);
    RTCManager.peerClient.on('close', RTCManager.handleClose);
    RTCManager.peerClient.on('disconnected', RTCManager.handleDisconnected);
    RTCManager.peerClient.on('connection', RTCManager.handleConnection);
    RTCManager.peerClient.on('open', RTCManager.handleOpen);
  }

  static connectConnectionHandlers() {
    RTCManager.connection.on('data', RTCManager.handleConnectionData);
  }

  // Point of entry
  static async joinRoom(hostPeerId, sessionName = 'New Session') {
    if (RTCManager.peerClient && RTCManager.peerClient.id) {
      return;
    }

    RTCManager.hostPeerId = hostPeerId;
    RTCManager.sessionName = sessionName;

    return await RTCManager.bootPeer(hostPeerId);
  }

  static handleConnectionData(data) {
    if (data.sessionName) {
      RTCManager.sessionName = data.sessionName;
    }
  }

  static handleOpen() {
    console.log(`[RTC] Initialized peer with id: ${RTCManager.peerClient.id}`);
    RTCManager.connection = RTCManager.peerClient.connect(
      RTCManager.hostPeerId
    );

    RTCManager.connectConnectionHandlers();
  }

  static handleError(error) {
    if (error.type === 'unavailable-id') {
      RTCManager.peerClient.destroy();
      RTCManager.peerClient = new Peer();
      RTCManager.connectPeerHandlers();
    }
  }

  static handleClose() {}

  static handleDisconnected() {}

  static handleConnection(connection) {
    connection.on('open', () => {
      console.log(`[RTC] ${connection.peer} connected!`);

      connection.send({ sessionName: RTCManager.sessionName });
    });

    connection.on('close', () => {
      console.log(`[RTC] ${connection.peer} disconnected!`);
    });

    connection.on('data', (data) => {
      console.log(`[RTC] ${connection.peer} sent:`, data);
    });
  }

  static sendMessage() {
    RTCManager.connection.send(`Hello, my name is ${RTCManager.peerClient.id}`);
  }

  static disconnect() {
    RTCManager.connection.close();
  }
}
