import { useEffect, useRef } from "react";

export default function Countdown({ endsAt, onEnd }) {
  const ref = useRef();

  useEffect(() => {
    var ended = false;

    const update = () => {
      var seconds = Math.max(0, Math.floor((endsAt - Date.now()) / 1000));

      if (endsAt && !ended && seconds <= 0) {
        ended = true;
        onEnd();
      }

      ref.current.innerText = seconds + "s";
    };

    const handle = setInterval(() => {
      update();
    }, 500);

    update();

    return () => {
      clearInterval(handle);
    };
  }, [endsAt, onEnd]);

  return <span ref={ref}></span>;
}
