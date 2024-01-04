export const getColor = (priority: string) => {
      if (priority === "High") {
        return "#f73446";
      } else if (priority === "Medium") {
        return "#ffbd21";
      } else {
        return "#0ac947";
      }
    };
