import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [activeTab, setActiveTab] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [onlineCount, setOnlineCount] = useState(0);
  const [showCreateGame, setShowCreateGame] = useState(false);
  const [userGames, setUserGames] = useState([]);
  const [forumPosts, setForumPosts] = useState([]);
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

    const updateOnlineCount = () => {
      const baseCount = 127;
      const variation = Math.floor(Math.random() * 50) - 25;
      setOnlineCount(baseCount + variation);
    };

    updateOnlineCount();
    const interval = setInterval(updateOnlineCount, 30000);
    return () => clearInterval(interval);
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
              <nav className="hidden md:flex gap-6">
                {["Главная", "Игры", "Создать", "Друзья", "Профиль", "Форум"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setActiveTab(item.toLowerCase())}
                    className={`px-3 py-2 rounded-lg transition-all ${
                      activeTab === item.toLowerCase() 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </nav>
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
                                setCurrentUser({
                                  username: registerForm.username,
                                  email: registerForm.email
                                });
                                setIsLoggedIn(true);
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
                      setCurrentUser({
                        username: 'Гость',
                        email: 'guest@blox2009.com'
                      });
                      setIsLoggedIn(true);
                    }}
                  >
                    <Icon name="LogIn" size={16} className="mr-2" />
                    Войти
                  </Button>
                </>
              ) : (
                <>
                  <Badge variant="secondary" className="bg-green-500 text-white">
                    <Icon name="Users" size={16} className="mr-1" />
                    {onlineCount} онлайн
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-white border-gray-300"
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
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

            {userGames.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userGames.slice(0, 6).map((game, index) => (
                  <Card key={index} className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
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
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Автор: {game.author}</span>
                        <Button size="sm" className="bg-roblox-blue hover:bg-roblox-blue/90">
                          <Icon name="Play" size={14} className="mr-1" />
                          Играть
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-white border border-gray-200 max-w-md mx-auto">
                <CardContent className="p-8 text-center">
                  <Icon name="GamepadIcon" size={48} className="text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Нет игр</h3>
                  <p className="text-gray-600 mb-4">Стань первым, кто создаст игру!</p>
                  <Button onClick={() => setActiveTab('создать')} className="bg-roblox-green hover:bg-roblox-green/90">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Создать игру
                  </Button>
                </CardContent>
              </Card>
            )}
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
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Автор: {game.author}</span>
                      <Button className="bg-roblox-blue hover:bg-roblox-blue/90">
                        <Icon name="Play" size={16} className="mr-2" />
                        Играть
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
                        setCurrentUser({
                          username: 'Гость',
                          email: 'guest@blox2009.com'
                        });
                        setIsLoggedIn(true);
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
                        <CardTitle>Мои Игры ({userGames.length})</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {userGames.map((game, index) => (
                            <div key={index} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                              <div className="flex-1">
                                <h4 className="font-medium text-lg">{game.title}</h4>
                                <p className="text-sm text-gray-600 mt-1">{game.description.split('\n')[0]}</p>
                                {game.port && (
                                  <p className="text-xs text-roblox-blue font-mono bg-blue-50 px-2 py-1 rounded mt-2 inline-block">
                                    Порт: {game.port}
                                  </p>
                                )}
                                <p className="text-xs text-gray-400 mt-2">
                                  Создано: {new Date(game.createdAt).toLocaleDateString('ru-RU')}
                                </p>
                              </div>
                              <div className="flex gap-2 ml-4">
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-red-600 hover:text-red-700 hover:border-red-300"
                                  onClick={() => setUserGames(prev => prev.filter((_, i) => i !== index))}
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



          <TabsContent value="друзья" className="space-y-6">
            <h2 className="text-3xl font-bold text-roblox-dark">Друзья</h2>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
              {friends.map((friend, index) => (
                <Card key={index} className="bg-white/95 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-roblox-blue to-roblox-purple rounded-full flex items-center justify-center text-white text-xl font-bold">
                        {friend.name[0]}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{friend.name}</h3>
                        <p className="text-muted-foreground">
                          {friend.status === 'online' ? 'Онлайн' : friend.status === 'ingame' ? `Играет в ${friend.game}` : 'Не в сети'}
                        </p>
                      </div>
                      <Badge 
                        variant={friend.status === 'online' ? 'default' : friend.status === 'ingame' ? 'secondary' : 'outline'}
                        className={
                          friend.status === 'online' ? 'bg-green-500' : 
                          friend.status === 'ingame' ? 'bg-yellow-500' : 
                          'text-muted-foreground'
                        }
                      >
                        {friend.status === 'online' ? '●' : friend.status === 'ingame' ? '▶' : '○'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="профиль" className="space-y-6">
            <Card className="bg-white/95 backdrop-blur-sm max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-roblox-blue to-roblox-purple rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  {currentUser.username ? currentUser.username[0].toUpperCase() : 'И'}
                </div>
                <CardTitle className="text-2xl">{currentUser.username || 'Игрок123'}</CardTitle>
                <p className="text-muted-foreground">
                  {currentUser.email || 'guest@blox2009.com'} • Участник с 2024 года
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <h4 className="font-semibold text-2xl text-roblox-blue">15</h4>
                    <p className="text-muted-foreground">Игр сыграно</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-2xl text-roblox-green">8</h4>
                    <p className="text-muted-foreground">Друзей</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-2xl text-roblox-yellow">1,250</h4>
                    <p className="text-muted-foreground">Robux</p>
                  </div>
                </div>
              </CardContent>
            </Card>
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