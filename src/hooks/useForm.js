import { useState } from "react";

export const useForm = (initialForm) => {
  const [formState, setFormState] = useState(initialForm);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const validateIP = (ip) => {
    const ipRegex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
  };

  const validateSubnetMask = (subnetMask) => {
    const validMasks = [
      "0.0.0.0",
      "128.0.0.0",
      "192.0.0.0",
      "224.0.0.0",
      "240.0.0.0",
      "248.0.0.0",
      "252.0.0.0",
      "254.0.0.0",
      "255.0.0.0",
      "255.128.0.0",
      "255.192.0.0",
      "255.224.0.0",
      "255.240.0.0",
      "255.248.0.0",
      "255.252.0.0",
      "255.254.0.0",
      "255.255.0.0",
      "255.255.128.0",
      "255.255.192.0",
      "255.255.224.0",
      "255.255.240.0",
      "255.255.248.0",
      "255.255.252.0",
      "255.255.254.0",
      "255.255.255.0",
      "255.255.255.128",
      "255.255.255.192",
      "255.255.255.224",
      "255.255.255.240",
      "255.255.255.248",
      "255.255.255.252",
      "255.255.255.254",
      "255.255.255.255"
    ];
    return validMasks.includes(subnetMask);
  };

  return {
    formState,
    setFormState,
    onInputChange,
    validateIP,
    validateSubnetMask,
  };
};
