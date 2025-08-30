import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [activeTab, setActiveTab] = useState("главная");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [onlineCount, setOnlineCount] = useState(0);
  const [realOnlineCount, setRealOnlineCount] = useState(1);
  const [userGames, setUserGames] = useState([]);
  const [forumPosts, setForumPosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [reportForm, setReportForm] = useState({ gameId: null, reason: '', description: '' });
  const [showReportDialog, setShowReportDialog] = useState(false);

  const [newPostForm, setNewPostForm] = useState({
    title: '',
    content: ''
  });
  const [newGameForm, setNewGameForm] = useState({
    title: '',
    description: '',
    port: '',
    imageUrl: ''
  });
  const [currentUser, setCurrentUser] = useState({
    username: '',
    email: ''
  });
  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Реальный онлайн счетчик и сохранение
  useEffect(() => {
    // Загрузка данных из localStorage
    const savedUser = localStorage.getItem('blox2009_user');
    const savedGames = localStorage.getItem('blox2009_games');
    const savedPosts = localStorage.getItem('blox2009_posts');
    const savedUsers = localStorage.getItem('blox2009_all_users');
    const savedFriendRequests = localStorage.getItem('blox2009_friend_requests');
    
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setIsLoggedIn(true);
    }
    
    if (savedGames) {
      setUserGames(JSON.parse(savedGames));
    }
    
    if (savedPosts) {
      setForumPosts(JSON.parse(savedPosts));
    }
    
    if (savedUsers) {
      setAllUsers(JSON.parse(savedUsers));
    }
    
    if (savedFriendRequests) {
      setFriendRequests(JSON.parse(savedFriendRequests));
    }

    // Реальный онлайн счетчик
    const updateRealOnline = () => {
      const users = JSON.parse(localStorage.getItem('blox2009_all_users') || '[]');
      setRealOnlineCount(users.length);
    };
    
    const updateFakeOnline = () => {
      const baseCount = 127;
      const variation = Math.floor(Math.random() * 50) - 25;
      setOnlineCount(baseCount + variation);
    };

    updateRealOnline();
    updateFakeOnline();
    
    const interval1 = setInterval(updateRealOnline, 5000);
    const interval2 = setInterval(updateFakeOnline, 30000);
    
    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, []);

  // Сохранение в localStorage
  useEffect(() => {
    if (isLoggedIn && currentUser.username) {
      localStorage.setItem('blox2009_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('blox2009_user');
    }
  }, [currentUser, isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('blox2009_games', JSON.stringify(userGames));
  }, [userGames]);

  useEffect(() => {
    localStorage.setItem('blox2009_posts', JSON.stringify(forumPosts));
  }, [forumPosts]);

  useEffect(() => {
    localStorage.setItem('blox2009_all_users', JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    localStorage.setItem('blox2009_friend_requests', JSON.stringify(friendRequests));
  }, [friendRequests]);

  // Функции для системы друзей
  const sendFriendRequest = (targetUsername) => {
    if (!isLoggedIn || targetUsername === currentUser.username) return;
    
    const existingRequest = friendRequests.find(req => 
      req.from === currentUser.username && req.to === targetUsername
    );
    
    if (!existingRequest) {
      setFriendRequests(prev => [...prev, {
        id: Date.now(),
        from: currentUser.username,
        to: targetUsername,
        status: 'pending',
        createdAt: new Date().toISOString()
      }]);
    }
  };

  const rateGame = (gameIndex, rating) => {
    setUserGames(prev => {
      const updated = [...prev];
      if (!updated[gameIndex].ratings) {
        updated[gameIndex].ratings = [];
      }
      
      const existingRating = updated[gameIndex].ratings.find(r => r.user === currentUser.username);
      if (existingRating) {
        existingRating.rating = rating;
      } else {
        updated[gameIndex].ratings.push({
          user: currentUser.username,
          rating: rating
        });
      }
      
      // Пересчитываем средний рейтинг
      const totalRating = updated[gameIndex].ratings.reduce((sum, r) => sum + r.rating, 0);
      updated[gameIndex].rating = (totalRating / updated[gameIndex].ratings.length).toFixed(1);
      
      return updated;
    });
  };

  const reportGame = (gameIndex, reason, description) => {
    console.log('Жалоба отправлена:', { gameIndex, reason, description, reporter: currentUser.username });
    setShowReportDialog(false);
    setReportForm({ gameId: null, reason: '', description: '' });
  };

  const games = [];

  const friends = [
    { name: "Игрок123", status: "online", game: "Блочное Приключение" },
    { name: "МегаСтроитель", status: "ingame", game: "Космическая База" },
    { name: "ПиратКапитан", status: "offline", game: null }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-roblox-dark">BLOX2009</h1>
              <Badge variant="secondary" className="bg-green-500 text-white">
                <Icon name="Users" size={16} className="mr-1" />
                {realOnlineCount} реальных игроков
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://bitl.itch.io/novetus" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="bg-white border-roblox-blue text-roblox-blue hover:bg-roblox-blue/10">
                  <Icon name="Download" size={16} className="mr-2" />
                  Скачать
                </Button>
              </a>
              {!isLoggedIn ? (
                <>
                  <Dialog open={showRegister} onOpenChange={setShowRegister}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="bg-white border-gray-300">
                        <Icon name="UserPlus" size={16} className="mr-2" />
                        Регистрация
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Добро пожаловать в BLOX2009!</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="username">Имя пользователя</Label>
                          <Input
                            id="username"
                            placeholder="Введите имя пользователя"
                            value={registerForm.username}
                            onChange={(e) => setRegisterForm(prev => ({...prev, username: e.target.value}))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Введите email"
                            value={registerForm.email}
                            onChange={(e) => setRegisterForm(prev => ({...prev, email: e.target.value}))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Пароль</Label>
                          <Input
                            id="password"
                            type="password"
                            placeholder="Введите пароль"
                            value={registerForm.password}
                            onChange={(e) => setRegisterForm(prev => ({...prev, password: e.target.value}))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Повторите пароль"
                            value={registerForm.confirmPassword}
                            onChange={(e) => setRegisterForm(prev => ({...prev, confirmPassword: e.target.value}))}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            className="flex-1 bg-roblox-blue hover:bg-roblox-blue/90"
                            onClick={() => {
                              if (registerForm.username && registerForm.email) {
                                const newUser = {
                                  username: registerForm.username,
                                  email: registerForm.email,
                                  joinedAt: new Date().toISOString(),
                                  friends: []
                                };
                                
                                setCurrentUser(newUser);
                                setIsLoggedIn(true);
                                
                                // Добавляем в список всех пользователей
                                setAllUsers(prev => {
                                  const exists = prev.find(u => u.username === registerForm.username);
                                  if (!exists) {
                                    return [...prev, newUser];
                                  }
                                  return prev;
                                });
                                
                                setShowRegister(false);
                                setRegisterForm({ username: '', email: '', password: '', confirmPassword: '' });
                              }
                            }}
                          >
                            Создать аккаунт
                          </Button>
                          <Button 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => setShowRegister(false)}
                          >
                            Отмена
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button 
                    size="sm" 
                    className="bg-roblox-green hover:bg-roblox-green/90"
                    onClick={() => {
                      const guestUser = {
                        username: 'Гость',
                        email: 'guest@blox2009.com',
                        joinedAt: new Date().toISOString(),
                        friends: []
                      };
                      
                      setCurrentUser(guestUser);
                      setIsLoggedIn(true);
                      
                      // Добавляем гостя в список пользователей
                      setAllUsers(prev => {
                        const exists = prev.find(u => u.username === 'Гость');
                        if (!exists) {
                          return [...prev, guestUser];
                        }
                        return prev;
                      });
                    }}
                  >
                    <Icon name="LogIn" size={16} className="mr-2" />
                    Войти
                  </Button>
                </>
              ) : (
                <>
                  <Badge variant="secondary" className="bg-blue-500 text-white">
                    <Icon name="Users" size={16} className="mr-1" />
                    {onlineCount} общий онлайн
                  </Badge>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.location.reload()}
                    className="mr-2"
                  >
                    <Icon name="RefreshCw" size={16} className="mr-2" />
                    Обновить
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => {
                      setIsLoggedIn(false);
                      setCurrentUser({ username: '', email: '' });
                    }}
                  >
                    <Icon name="LogOut" size={16} className="mr-2" />
                    Выйти
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Dialog для жалоб */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Пожаловаться на игру</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="reason">Причина жалобы</Label>
              <Select value={reportForm.reason} onValueChange={(value) => setReportForm(prev => ({...prev, reason: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите причину" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spam">Спам</SelectItem>
                  <SelectItem value="inappropriate">Неподходящий контент</SelectItem>
                  <SelectItem value="broken">Игра не работает</SelectItem>
                  <SelectItem value="copy">Копия чужой игры</SelectItem>
                  <SelectItem value="other">Другое</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="reportDesc">Описание проблемы</Label>
              <Textarea
                id="reportDesc"
                placeholder="Опишите, что не так с этой игрой..."
                value={reportForm.description}
                onChange={(e) => setReportForm(prev => ({...prev, description: e.target.value}))}
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                className="flex-1 bg-red-500 hover:bg-red-600"
                onClick={() => reportGame(reportForm.gameId, reportForm.reason, reportForm.description)}
              >
                Отправить жалобу
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowReportDialog(false)}
              >
                Отмена
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-white/90 backdrop-blur-sm">
            <TabsTrigger value="главная" className="data-[state=active]:bg-roblox-blue data-[state=active]:text-white">
              <Icon name="Home" size={16} className="mr-2" />
              Главная
            </TabsTrigger>
            <TabsTrigger value="игры" className="data-[state=active]:bg-roblox-green data-[state=active]:text-white">
              <Icon name="Gamepad2" size={16} className="mr-2" />
              Игры
            </TabsTrigger>
            <TabsTrigger value="игроки" className="data-[state=active]:bg-roblox-purple data-[state=active]:text-white">
              <Icon name="Users" size={16} className="mr-2" />
              Игроки
            </TabsTrigger>
            <TabsTrigger value="создать" className="data-[state=active]:bg-roblox-yellow data-[state=active]:text-white">
              <Icon name="Plus" size={16} className="mr-2" />
              Создать
            </TabsTrigger>
            <TabsTrigger value="форум" className="data-[state=active]:bg-roblox-orange data-[state=active]:text-white">
              <Icon name="MessageCircle" size={16} className="mr-2" />
              Форум
            </TabsTrigger>
          </TabsList>

          {/* Home Tab */}
          <TabsContent value="главная" className="space-y-6">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-4xl font-bold text-roblox-dark">
                {isLoggedIn ? `Привет, ${currentUser.username}!` : 'Добро пожаловать в BLOX2009!'}
              </h2>
              <p className="text-xl text-gray-600">
                {isLoggedIn ? 'Играй, создавай, исследуй безграничные миры' : 'Зарегистрируйся и начни своё приключение!'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Activity" className="text-roblox-purple" />
                    Статистика
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <h4 className="font-semibold text-2xl text-green-600">{realOnlineCount}</h4>
                      <p className="text-sm text-gray-500">реальных игроков</p>
                    </div>
                    <div className="text-center">
                      <h4 className="font-semibold text-2xl text-roblox-blue">{onlineCount}</h4>
                      <p className="text-sm text-gray-500">общий онлайн</p>
                    </div>
                    <div className="text-center">
                      <h4 className="font-semibold text-2xl text-roblox-green">{userGames.length}</h4>
                      <p className="text-sm text-gray-500">игр создано</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Users" className="text-roblox-blue" />
                    Новые игроки
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {allUsers.slice(-3).reverse().map((user, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-roblox-blue to-roblox-purple rounded-full flex items-center justify-center text-white font-bold">
                          {user.username[0]}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{user.username}</h4>
                          <p className="text-sm text-gray-500">
                            {new Date(user.joinedAt).toLocaleDateString('ru-RU')}
                          </p>
                        </div>
                        {isLoggedIn && user.username !== currentUser.username && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => sendFriendRequest(user.username)}
                          >
                            <Icon name="UserPlus" size={14} />
                          </Button>
                        )}
                      </div>
                    ))}
                    {allUsers.length === 0 && (
                      <p className="text-sm text-gray-500 text-center">Нет зарегистрированных игроков</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Gamepad2" className="text-roblox-green" />
                    Последние игры
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {userGames.slice(-3).reverse().map((game, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setActiveTab('игры')}>
                        <img 
                          src={game.imageUrl || '/img/8a2b3c08-ca18-44e5-89d5-263e09e6bbb0.jpg'} 
                          alt={game.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{game.title}</h4>
                          <p className="text-sm text-gray-500">★ {game.rating || '5.0'}</p>
                        </div>
                      </div>
                    ))}
                    {userGames.length === 0 && (
                      <p className="text-sm text-gray-500 text-center">
                        Игр пока нет<br/>
                        <Button 
                          size="sm" 
                          variant="link" 
                          className="p-0 h-auto text-roblox-blue"
                          onClick={() => setActiveTab('создать')}
                        >
                          Создать первую игру
                        </Button>
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Games Tab */}
          <TabsContent value="игры" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-roblox-dark">Игры</h2>
              <div className="flex gap-2">
                <Button variant="outline" className="bg-white border-gray-300">
                  <Icon name="Filter" size={16} className="mr-2" />
                  Фильтр
                </Button>
                <Button variant="outline" className="bg-white border-gray-300">
                  <Icon name="Search" size={16} className="mr-2" />
                  Поиск
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userGames.map((game, index) => (
                <Card key={game.id || index} className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg bg-gray-100">
                    <img 
                      src={game.imageUrl || '/img/8a2b3c08-ca18-44e5-89d5-263e09e6bbb0.jpg'} 
                      alt={game.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-500">
                      ★ {game.rating || '5.0'}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{game.title}</CardTitle>
                    <p className="text-sm text-gray-600">{game.description}</p>
                    {game.port && (
                      <p className="text-xs text-roblox-blue font-mono bg-gray-100 px-2 py-1 rounded">
                        Порт: {game.port}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Автор: {game.author}</span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => isLoggedIn && rateGame(index, star)}
                              className={`text-lg ${star <= (game.rating || 5) ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-500 transition-colors`}
                              disabled={!isLoggedIn}
                            >
                              ★
                            </button>
                          ))}
                          <span className="text-sm text-gray-600 ml-2">({game.rating || '5.0'})</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <Button className="bg-roblox-blue hover:bg-roblox-blue/90">
                          <Icon name="Play" size={16} className="mr-2" />
                          Играть
                        </Button>
                        {isLoggedIn && currentUser.username !== game.author && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => {
                              setReportForm({ gameId: index, reason: '', description: '' });
                              setShowReportDialog(true);
                            }}
                          >
                            <Icon name="Flag" size={14} className="mr-1" />
                            Пожаловаться
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Players Tab */}
          <TabsContent value="игроки" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-roblox-dark">Игроки ({allUsers.length})</h2>
              <Badge variant="secondary" className="bg-green-500 text-white">
                <Icon name="Users" size={16} className="mr-1" />
                {realOnlineCount} онлайн
              </Badge>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allUsers.map((user, index) => (
                <Card key={index} className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-roblox-blue to-roblox-purple rounded-full flex items-center justify-center text-white text-xl font-bold">
                        {user.username[0]}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{user.username}</h3>
                        <p className="text-sm text-gray-500">
                          Присоединился: {new Date(user.joinedAt).toLocaleDateString('ru-RU')}
                        </p>
                        <Badge variant="secondary" className="bg-green-500 text-white mt-1">
                          Онлайн
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Игр создано:</span>
                        <span className="font-semibold">{userGames.filter(game => game.author === user.username).length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Постов на форуме:</span>
                        <span className="font-semibold">{forumPosts.filter(post => post.author === user.username).length}</span>
                      </div>
                    </div>
                    
                    {isLoggedIn && user.username !== currentUser.username && (
                      <div className="flex gap-2 mt-4">
                        <Button 
                          size="sm" 
                          className="flex-1 bg-roblox-blue hover:bg-roblox-blue/90"
                          onClick={() => sendFriendRequest(user.username)}
                        >
                          <Icon name="UserPlus" size={14} className="mr-1" />
                          В друзья
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Icon name="MessageCircle" size={14} className="mr-1" />
                          Сообщение
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
              
              {allUsers.length === 0 && (
                <Card className="bg-white border border-gray-200 col-span-full">
                  <CardContent className="p-8 text-center">
                    <Icon name="Users" size={48} className="text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Нет зарегистрированных игроков</h3>
                    <p className="text-gray-600">Станьте первым участником сообщества!</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Create Game Tab */}
          <TabsContent value="создать" className="space-y-6">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-roblox-dark mb-2">Создай Свою Игру</h2>
              <p className="text-gray-600 mb-8">Воплоти свои идеи в жизнь и поделись ими с миром!</p>
              
              {!isLoggedIn ? (
                <Card className="bg-white border border-gray-200">
                  <CardContent className="p-8 text-center">
                    <Icon name="Lock" size={48} className="text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Войдите в аккаунт</h3>
                    <p className="text-gray-600 mb-4">Для создания игр необходимо войти в аккаунт</p>
                    <Button 
                      onClick={() => {
                        const guestUser = {
                          username: 'Гость',
                          email: 'guest@blox2009.com',
                          joinedAt: new Date().toISOString(),
                          friends: []
                        };
                        setCurrentUser(guestUser);
                        setIsLoggedIn(true);
                        setAllUsers(prev => {
                          const exists = prev.find(u => u.username === 'Гость');
                          if (!exists) {
                            return [...prev, guestUser];
                          }
                          return prev;
                        });
                      }} 
                      className="bg-roblox-blue hover:bg-roblox-blue/90"
                    >
                      Войти
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  <Card className="bg-white border border-gray-200">
                    <CardHeader>
                      <CardTitle>Создать Новую Игру</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="gameTitle">Название игры</Label>
                        <Input
                          id="gameTitle"
                          placeholder="Моя крутая игра"
                          value={newGameForm.title}
                          onChange={(e) => setNewGameForm(prev => ({...prev, title: e.target.value}))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="gameDesc">Описание и порт</Label>
                        <Textarea
                          id="gameDesc"
                          placeholder="Опишите свою игру...\n\nПорт: 53640"
                          value={newGameForm.description}
                          onChange={(e) => setNewGameForm(prev => ({...prev, description: e.target.value}))}
                          rows={4}
                        />
                      </div>
                      <div>
                        <Label htmlFor="gameImage">Ссылка на картинку (необязательно)</Label>
                        <Input
                          id="gameImage"
                          placeholder="https://example.com/image.jpg"
                          value={newGameForm.imageUrl}
                          onChange={(e) => setNewGameForm(prev => ({...prev, imageUrl: e.target.value}))}
                        />
                      </div>
                      <Button 
                        className="w-full bg-roblox-green hover:bg-roblox-green/90"
                        onClick={() => {
                          if (newGameForm.title && newGameForm.description) {
                            // Оизвлекаем порт из описания
                            const portMatch = newGameForm.description.match(/Порт:?\s*(\d+)/i);
                            const port = portMatch ? portMatch[1] : '';
                            
                            setUserGames(prev => [...prev, {
                              id: Date.now(),
                              title: newGameForm.title,
                              description: newGameForm.description,
                              port: port,
                              imageUrl: newGameForm.imageUrl,
                              author: currentUser.username,
                              rating: 5.0,
                              ratings: [],
                              createdAt: new Date().toISOString()
                            }]);
                            setNewGameForm({ title: '', description: '', port: '', imageUrl: '' });
                          }
                        }}
                      >
                        <Icon name="Plus" size={16} className="mr-2" />
                        Опубликовать Игру
                      </Button>
                    </CardContent>
                  </Card>

                  {userGames.length > 0 && (
                    <Card className="bg-white border border-gray-200">
                      <CardHeader>
                        <CardTitle>Мои Игры ({userGames.filter(game => game.author === currentUser.username).length})</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {userGames.filter(game => game.author === currentUser.username).map((game, index) => (
                            <div key={index} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                              <div className="flex-1">
                                <h4 className="font-medium text-lg">{game.title}</h4>
                                <p className="text-sm text-gray-600 mt-1">{game.description.split('\n')[0]}</p>
                                {game.port && (
                                  <p className="text-xs text-roblox-blue font-mono bg-blue-50 px-2 py-1 rounded mt-2 inline-block">
                                    Порт: {game.port}
                                  </p>
                                )}
                                <div className="flex items-center gap-2 mt-2">
                                  <span className="text-sm text-yellow-600">★ {game.rating}</span>
                                  <span className="text-xs text-gray-400">
                                    ({game.ratings ? game.ratings.length : 0} оценок)
                                  </span>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">
                                  Создано: {new Date(game.createdAt).toLocaleDateString('ru-RU')}
                                </p>
                              </div>
                              <div className="flex gap-2 ml-4">
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-red-600 hover:text-red-700 hover:border-red-300"
                                  onClick={() => setUserGames(prev => prev.filter(g => g.id !== game.id))}
                                >
                                  <Icon name="Trash2" size={14} />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="форум" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-roblox-dark">Форум</h2>
              {isLoggedIn && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-roblox-blue hover:bg-roblox-blue/90">
                      <Icon name="Plus" size={16} className="mr-2" />
                      Новая тема
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Новая тема на форуме</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="postTitle">Заголовок</Label>
                        <Input
                          id="postTitle"
                          placeholder="О чём хотите поговорить?"
                          value={newPostForm.title}
                          onChange={(e) => setNewPostForm(prev => ({...prev, title: e.target.value}))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="postContent">Сообщение</Label>
                        <Textarea
                          id="postContent"
                          placeholder="Напишите своё сообщение..."
                          value={newPostForm.content}
                          onChange={(e) => setNewPostForm(prev => ({...prev, content: e.target.value}))}
                          rows={6}
                        />
                      </div>
                      <Button 
                        className="w-full bg-roblox-green hover:bg-roblox-green/90"
                        onClick={() => {
                          if (newPostForm.title && newPostForm.content) {
                            setForumPosts(prev => [{
                              id: Date.now(),
                              title: newPostForm.title,
                              content: newPostForm.content,
                              author: currentUser.username,
                              createdAt: new Date().toISOString(),
                              replies: 0
                            }, ...prev]);
                            setNewPostForm({ title: '', content: '' });
                          }
                        }}
                      >
                        <Icon name="Send" size={16} className="mr-2" />
                        Опубликовать
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
            
            <div className="grid gap-4">
              {forumPosts.length > 0 ? (
                forumPosts.map((post, index) => (
                  <Card key={index} className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg text-roblox-dark">{post.title}</h3>
                          <p className="text-sm text-gray-500">
                            Автор: {post.author} • {new Date(post.createdAt).toLocaleDateString('ru-RU')}
                          </p>
                        </div>
                        <Badge variant="secondary">
                          {post.replies} ответов
                        </Badge>
                      </div>
                      <p className="text-gray-700 mb-4">{post.content}</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Icon name="MessageCircle" size={14} className="mr-2" />
                          Ответить
                        </Button>
                        {currentUser.username === post.author && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-red-600 hover:text-red-700"
                            onClick={() => setForumPosts(prev => prev.filter((_, i) => i !== index))}
                          >
                            <Icon name="Trash2" size={14} />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="bg-white border border-gray-200">
                  <CardContent className="p-8 text-center">
                    <Icon name="MessageSquare" size={48} className="text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Форум пуст</h3>
                    <p className="text-gray-600 mb-4">Стань первым, кто начнёт обсуждение!</p>
                    {!isLoggedIn && (
                      <p className="text-sm text-gray-500">Войдите в аккаунт, чтобы создавать темы</p>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}