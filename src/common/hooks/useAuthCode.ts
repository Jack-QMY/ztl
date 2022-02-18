import { useCallback, useState } from 'react';
import { useCountDown } from '~/common';

export function useAuthCode() {
    const [loading, setLoading] = useState(false);
    const [authCode, setAuthCode] = useState('');
    const [count, setCountDown] = useState(58000);
    const { seconds, isEnd } = useCountDown({ count });
    const fetchAuthCode = useCallback(async (phone, action = 'PAY_PASSWORD') => {
        setLoading(true);
        setLoading(false);
        setCountDown(59000);
        setAuthCode('123456');
        Toast.show({ content: '验证码发送成功' });
    }, []);

    return { fetchAuthCode, authCode, loading, countDown: isEnd ? '' : seconds };
}
