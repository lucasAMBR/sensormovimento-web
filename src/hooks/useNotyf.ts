"use client"

import { useEffect, useRef } from 'react';
import type { Notyf } from 'notyf';

const useNotyf = () => {
  const notyfRef = useRef<Notyf | null>(null);

  useEffect(() => {
    const initializeNotyf = async () => {
      const { Notyf } = await import('notyf');
      await import('notyf/notyf.min.css');

      if (!notyfRef.current) {
        notyfRef.current = new Notyf({
          duration: 3000,
          position: {
            x: 'right',
            y: 'top',
          },
          types: [
            {
              type: 'success',
              backgroundColor: '#28a745',
              icon: {
                className: 'notyf__icon--success',
                tagName: 'i',
              },
            },
            {
              type: 'error',
              backgroundColor: '#dc3545',
              icon: {
                className: 'notyf__icon--error',
                tagName: 'i',
              },
            },
          ],
        });
      }
    };

    initializeNotyf();

    return () => {
      // Limpeza da instância ao desmontar o componente
      notyfRef.current = null;
    };
  }, []);

  const notyf = {
    success: (message: string) => {
      notyfRef.current?.success(message);
    },
    error: (message: string) => {
      notyfRef.current?.error(message);
    },
  };

  return notyf;
};

export default useNotyf;