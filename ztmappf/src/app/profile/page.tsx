'use client'

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation';
import { useAuth } from "@/hooks/useAuth";
import { fetchData } from '@/lib/utils';

export default function ProfilePage() {
  const { isLoggedIn, user, checkAuth, logout } = useAuth();
  const [updatedUser, setUpdatedUser] = useState({ id: 0, name: '', email: '' });
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await fetchData('auth/current', {
          method: 'GET',
          credentials: 'include',
        }).then((userData: any) => {
            setUpdatedUser(userData.data)
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetchData(`users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        data: JSON.stringify({ ...updatedUser, password }),
      });
      console.log(response);
      const updatedUser = await response.data;
      setUpdatedUser(updatedUser);
      setPassword('');
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={updatedUser.name}
                onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={updatedUser.email}
                onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input id="password" type="password" />
            </div>
            <Button type="submit">Update Profile</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

