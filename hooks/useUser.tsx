import { useEffect, useState, createContext, useContext } from 'react';
import {
    useUser as useSupaUser,
    useSessionContext,
    User
} from '@supabase/auth-helpers-react';

import { UserDetails, Subscription } from '@/types';

type UserContextType = {
    accessToken: string | null;
    user: User | null;
    userDetails: UserDetails | null;
    isLoading: boolean;
    subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(
    undefined
);

export interface Props {
    [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
    const {
        session,
        isLoading: isLoadingUser,
        supabaseClient: supabase
    } = useSessionContext();
    const user = useSupaUser();
    const accessToken = session?.access_token ?? null;
    const [isLoadingData, setIsloadingData] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [subscription, setSubscription] = useState<Subscription | null>(null);

    const getUserDetails = () => supabase.from('users').select('*').single();
    const getSubscription = () =>
        supabase
            .from('subscriptions')
            .select('*, prices(*, products(*))')
            .in('status', ['trialing', 'active'])
            .single();

    useEffect(() => {
        const fetchData = async () => {

            if (user && !isLoadingData && !userDetails && !subscription) {
                setIsloadingData(true);

                const userDetails = await getUserDetails();
                const subscriptionDetails = await getSubscription();

                if (userDetails) {
                    setUserDetails(userDetails.data);
                }
                else {
                    console.log("Problem with accquiring user details");
                }

                if (subscriptionDetails) {
                    setSubscription(subscriptionDetails.data);
                }
                else {
                    console.log("Problem with accquiring user subscription");
                }

                setIsloadingData(false);
            }
            else if (!user && !isLoadingUser && !isLoadingData) {
                setUserDetails(null);
                setSubscription(null);
            }
        }

        fetchData();

    }, [user, isLoadingUser]);

    const value = {
        accessToken,
        user,
        userDetails,
        isLoading: isLoadingUser || isLoadingData,
        subscription
    };

    return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error(`useUser must be used within a MyUserContextProvider.`);
    }
    return context;
};