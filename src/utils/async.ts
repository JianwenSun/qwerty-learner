import { useEffect, useState, useCallback } from "react";

export function useAsyncData<T>(asyncFn: () => Promise<T>, deps: React.DependencyList = []) {
    const [data, setData] = useState<T | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | undefined>(undefined);

    const memoizedAsyncFn = useCallback(asyncFn, deps);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await memoizedAsyncFn();
                setData(result);
            } catch (err) {
                console.error('Error fetching data:', err)
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [memoizedAsyncFn]);

    return { data, loading, error };
}