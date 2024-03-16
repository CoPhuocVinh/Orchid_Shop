export const isStatusDisabled = (currentStatus: any, targetStatus: any) => {
    switch (currentStatus) {
      case "WAITING":
        return ["COMING", "LIVE", "END"].includes(targetStatus);
      case "COMING":
        return targetStatus === "WAITING";
      case "LIVE":
        return ["WAITING", "COMING"].includes(targetStatus);
      case "END":
        return ["WAITING", "COMING", "LIVE"].includes(targetStatus);
      default:
        return false;
    }
  };