import { useEffect, useState, useRef } from "react";

export default function useIntersect() {

  const [entry, setEntry] = useState({});
  const [node, setNode] = useState(null)

  const observer = useRef(new window.IntersectionObserver((entry) => setEntry(entry)));

  useEffect(() => {

    const { current: currentObserver } = observer;
    currentObserver.disconnect()

    if (node) currentObserver.observe(node);

    return () => currentObserver.disconnect();

  }, [node])

  return [entry, setNode];
}
