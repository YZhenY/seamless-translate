import { useEffect, useRef } from 'react';
import debug from '../debug';

export function useRenderTime(componentName: string) {
  const renderStart = useRef(performance.now());

  useEffect(() => {
    const renderTime = performance.now() - renderStart.current;
    debug()?.measureComponentRender(componentName, renderTime);
  });
}