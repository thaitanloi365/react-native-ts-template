import {useState, useEffect} from 'react';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';

type NetInfoTuple = [boolean, boolean];
export function useNetWorkStatus(): NetInfoTuple {
  const [status, setStatus] = useState<boolean>(false);
  const [canAccess, setCanAccess] = useState<boolean>(false);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setStatus(state.isConnected);
      setCanAccess(state.isInternetReachable ?? false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return [status, canAccess];
}
