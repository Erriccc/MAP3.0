import { NextSeo } from 'next-seo';
import DashboardLayout from 'layouts/_dashboard';
import Button from '/components/ui/button';
import NotificationCard from '/components/ui/notification-card';
//images
import User1 from 'assets/images/avatar/8.jpg';
import User2 from 'assets/images/avatar/9.jpg';
import User3 from 'assets/images/avatar/10.jpg';
import User4 from 'assets/images/avatar/11.jpg';
const notifications = [
    {
        id: 1,
        type: 'followed',
        actor: {
            name: 'dolcemariposa',
            avatar: User1,
        },
        time: 'Just Now',
        url: '#',
        notifier: 'you',
    },
    {
        id: 2,
        type: 'liked',
        actor: {
            name: 'pimptronot',
            avatar: User2,
        },
        time: '10 minutes ago',
        url: '#',
        notifier: 'Cryppo #1491',
    },
    {
        id: 3,
        type: 'purchased',
        actor: {
            name: 'centralgold',
            avatar: User3,
        },
        time: '20 minutes ago',
        url: '#',
        notifier: 'Pepe mfer #16241',
    },
    {
        id: 4,
        type: 'followed',
        actor: {
            name: 'theline',
            avatar: User4,
        },
        time: '30 minutes ago',
        url: '#',
        notifier: 'you',
    }, 
];
const NotificationPage = () => {
    return (<>
      <NextSeo title="Notifications" description="Map3 - find crypto friendly businesses near you, and make crypto payments in your preferred currency."/>
      <DashboardLayout>
        <div className="mx-auto w-[660px] max-w-full">
          <div className="mb-7 flex items-center justify-between gap-6">
            <h2 className="text-center text-lg font-medium text-gray-900 dark:text-white sm:text-xl lg:text-2xl">
              user suggestions
            </h2>
            <Button color="white" variant="transparent" size="mini" shape="rounded">
              <span className="text-xs tracking-tighter">Mark all as read</span>
            </Button>
          </div>

          {notifications.map((notification) => {
            const notificationItem = notification;
            return (<NotificationCard key={notification.id} {...notificationItem}/>);
        })}
        </div>
      </DashboardLayout>
    </>);
};
export default NotificationPage;
