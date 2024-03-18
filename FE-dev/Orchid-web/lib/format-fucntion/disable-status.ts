export const isStatusDisabled = (currentStatus: any, targetStatus: any) => {
    switch (currentStatus) {
      case "WAITING":
        return ["COMING", "LIVE", "END"].includes(targetStatus);
      case "COMING":
        return ["WAITING", "END"].includes(targetStatus);
      case "LIVE":
        return ["WAITING", "COMING", "END"].includes(targetStatus);
      case "END":
        return ["WAITING", "COMING", "LIVE"].includes(targetStatus);
      default:
        return false;
    }
  };