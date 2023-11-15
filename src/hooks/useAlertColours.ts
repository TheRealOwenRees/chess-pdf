import { useState, useEffect } from "react";

const useAlertColours = () => {
  const [alertColour, setAlertColour] = useState('red');
  const [alertClass, setAlertClass] = useState({
    alertDiv: '',
    alertSvg: '',
  });

  useEffect(() => {
    setAlertClass({
      alertDiv: `mt-4 bg-${alertColour}-100 border border-${alertColour}-400 text-${alertColour}-700 px-4 py-3 rounded relative`,
      alertSvg: `fill-${alertColour}-700 h-6 w-6 text-${alertColour}-500`,
    })
  }, [alertColour]);

  return {
    alertDiv: alertClass.alertDiv,
    alertSvg: alertClass.alertSvg,
    setAlertColour
  }
}

export default useAlertColours