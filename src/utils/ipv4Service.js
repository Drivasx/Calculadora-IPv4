export const calculateNetworkIP = (ip, subnetMask) => {
  const ipParts = ip.split('.').map(Number);
  const maskParts = subnetMask.split('.').map(Number);
  const networkIPParts = ipParts.map((part, index) => part & maskParts[index]);
  return networkIPParts.join('.');
} 

export const calculateBroadcastIP = (ip, subnetMask) => {
  const ipParts = ip.split('.').map(Number);
  const maskParts = subnetMask.split('.').map(Number);
  const broadcastIPParts = ipParts.map((part, index) => part | (~maskParts[index] & 255));
  return broadcastIPParts.join('.');
}

export const calculateUtilsIPs = (networkIP, broadcastIP) => {
  const networkParts = networkIP.split('.').map(Number);
  const broadcastParts = broadcastIP.split('.').map(Number);
  
  // Convertir IPs a números de 32 bits usando aritmética no bitwise
  // para evitar conversiones a signed 32-bit que producen números negativos
  const networkNum = networkParts[0] * 16777216 + networkParts[1] * 65536 + networkParts[2] * 256 + networkParts[3];
  const broadcastNum = broadcastParts[0] * 16777216 + broadcastParts[1] * 65536 + broadcastParts[2] * 256 + broadcastParts[3];

  const totalUtilIPs = broadcastNum - networkNum - 1;
  // Casos especiales:
  // - Si networkNum === broadcastNum => red /32, una única IP
  // - Si broadcastNum === networkNum + 1 => red /31, dos IPs (RFC 3021)
  let firstUtilIP;
  let lastUtilIP;
  let usableCount = totalUtilIPs;

  if (broadcastNum === networkNum) {
    usableCount = 1;
    firstUtilIP = networkNum;
    lastUtilIP = networkNum;
  } else if (broadcastNum === networkNum + 1) {
    usableCount = 2;
    firstUtilIP = networkNum;
    lastUtilIP = broadcastNum;
  } else {
    usableCount = broadcastNum - networkNum - 1;
    firstUtilIP = networkNum + 1;
    lastUtilIP = broadcastNum - 1;
  }
  
  return {
    totalCount: usableCount,
    firstIPNum: firstUtilIP,
    lastIPNum: lastUtilIP,
    firstIP: `${(firstUtilIP >>> 24) & 255}.${(firstUtilIP >>> 16) & 255}.${(firstUtilIP >>> 8) & 255}.${firstUtilIP & 255}`,
    lastIP: `${(lastUtilIP >>> 24) & 255}.${(lastUtilIP >>> 16) & 255}.${(lastUtilIP >>> 8) & 255}.${lastUtilIP & 255}`,
    range: `${(firstUtilIP >>> 24) & 255}.${(firstUtilIP >>> 16) & 255}.${(firstUtilIP >>> 8) & 255}.${firstUtilIP & 255} - ${(lastUtilIP >>> 24) & 255}.${(lastUtilIP >>> 16) & 255}.${(lastUtilIP >>> 8) & 255}.${lastUtilIP & 255}`
  };
}

// Función auxiliar para generar una IP específica por índice
export const generateIPByIndex = (firstIPNum, index) => {
  const ipNum = (firstIPNum + index) >>> 0; // asegurar entero sin signo de 32 bits
  return `${(ipNum >>> 24) & 255}.${(ipNum >>> 16) & 255}.${(ipNum >>> 8) & 255}.${ipNum & 255}`;
}

export const calculateUtilsIPsRange = (utilsIPs) => {
  if (typeof utilsIPs === 'object' && utilsIPs.range) {
    return utilsIPs.range;
  }
  
  if (!utilsIPs || utilsIPs.length === 0) return "";
  
  // Si es un array normal, calcular el rango
  return `${utilsIPs[0]} - ${utilsIPs[utilsIPs.length - 1]}`;
}

export const determineIPClass = (ip) => {
  const firstOctet = parseInt(ip.split('.')[0]);
  if (firstOctet >= 1 && firstOctet <= 126) return 'A';
  if (firstOctet >= 128 && firstOctet <= 191) return 'B';
  if (firstOctet >= 192 && firstOctet <= 223) return 'C';
  if (firstOctet >= 224 && firstOctet <= 239) return 'D';
  if (firstOctet >= 240 && firstOctet <= 254) return 'E';
  return 'Unknown';
}

export const isPrivateIP = (ip) => {
  const parts = ip.split('.').map(Number);
  return (
    (parts[0] === 10) ||
    (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
    (parts[0] === 192 && parts[1] === 168)
  );
}

export const ipToBinary = (ip) => {
  return ip.split('.').map(octet => {
    return parseInt(octet).toString(2).padStart(8, '0');
  }).join('');
}

export const subnetMaskToBinary = (subnetMask) => {
  return subnetMask.split('.').map(octet => {
    return parseInt(octet).toString(2).padStart(8, '0');
  }).join('');
}

export const calculateNetworkAndHostPortion = (ip, subnetMask) => {
  const ipBinary = ipToBinary(ip);
  const maskBinary = subnetMaskToBinary(subnetMask);
  
  const networkBits = maskBinary.split('').filter(bit => bit === '1').length;
  
  return {
    ipBinary: ipBinary,
    maskBinary: maskBinary,
    networkPortion: ipBinary.substring(0, networkBits),
    hostPortion: ipBinary.substring(networkBits),
    networkBits: networkBits,
    hostBits: 32 - networkBits
  };
}

