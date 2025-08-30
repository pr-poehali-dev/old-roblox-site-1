import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [activeTab, setActiveTab] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [avatarConfig, setAvatarConfig] = useState({
    skinColor: '#FDB94E',
    shirtColor: '#00A2FF',
    pantsColor: '#2ECC40',
    hatType: 'cap'
  });

  const games = [
    {
      id: 1,
      title: "Блочное Приключение",
      description: "Исследуй мир из кубиков и строй невероятные сооружения",
      players: "2.1К играют",
      rating: 4.8,
      image: "/img/8a2b3c08-ca18-44e5-89d5-263e09e6bbb0.jpg"
    },
    {
      id: 2,
      title: "Космическая База",
      description: "Создай свою космическую станцию среди звёзд",
      players: "1.5К играют",
      rating: 4.6,
      image: "/img/8a2b3c08-ca18-44e5-89d5-263e09e6bbb0.jpg"
    },
    {
      id: 3,
      title: "Пиратские Сокровища",
      description: "Ищи сокровища и сражайся с пиратами на море",
      players: "987 играют",
      rating: 4.7,
      image: "/img/8a2b3c08-ca18-44e5-89d5-263e09e6bbb0.jpg"
    }
  ];

  const friends = [
    { name: "Игрок123", status: "online", game: "Блочное Приключение" },
    { name: "МегаСтроитель", status: "ingame", game: "Космическая База" },
    { name: "ПиратКапитан", status: "offline", game: null }
  ];

  const catalogItems = [
    { name: "Красная кепка", price: 50, type: "hat" },
    { name: "Крутые очки", price: 100, type: "accessory" },
    { name: "Космический костюм", price: 250, type: "shirt" },
    { name: "Джинсы", price: 75, type: "pants" }
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
                {["Главная", "Игры", "Каталог", "Друзья", "Профиль", "Форум"].map((item) => (
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
              <Button variant="outline" size="sm" className="bg-white border-roblox-blue text-roblox-blue hover:bg-roblox-blue/10">
                <Icon name="Download" size={16} className="mr-2" />
                Скачать
              </Button>
              {!isLoggedIn ? (
                <>
                  <Dialog open={showRegister} onOpenChange={setShowRegister}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="bg-white/90">
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
                              setIsLoggedIn(true);
                              setShowRegister(false);
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
                        <p className="text-xs text-muted-foreground text-center">
                          Регистрируясь, вы соглашаетесь с условиями использования BLOX2009
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button 
                    size="sm" 
                    className="bg-roblox-green hover:bg-roblox-green/90"
                    onClick={() => setIsLoggedIn(true)}
                  >
                    <Icon name="LogIn" size={16} className="mr-2" />
                    Войти
                  </Button>
                </>
              ) : (
                <>
                  <Badge variant="secondary" className="bg-roblox-yellow text-roblox-dark">
                    <Icon name="Coins" size={16} className="mr-1" />
                    1,250 R$
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-white/90"
                    onClick={() => setIsLoggedIn(false)}
                  >
                    <Icon name="LogOut" size={16} className="mr-2" />
                    Выйти
                  </Button>
                </>
              )}
              {isLoggedIn && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Icon name="User" size={16} className="mr-2" />
                    Аватар
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Настройка Аватара</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div className="flex justify-center">
                      <div 
                        className="w-32 h-40 rounded-lg border-4 border-white shadow-lg relative overflow-hidden"
                        style={{ backgroundColor: avatarConfig.skinColor }}
                      >
                        <div 
                          className="absolute top-8 left-4 right-4 h-12 rounded"
                          style={{ backgroundColor: avatarConfig.shirtColor }}
                        />
                        <div 
                          className="absolute top-20 left-4 right-4 bottom-4 rounded"
                          style={{ backgroundColor: avatarConfig.pantsColor }}
                        />
                        {avatarConfig.hatType === 'cap' && (
                          <div className="absolute top-2 left-6 right-6 h-6 bg-roblox-dark rounded-full" />
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Цвет кожи</label>
                        <div className="flex gap-2">
                          {['#FDB94E', '#D2691E', '#8B4513', '#FFE4B5'].map((color) => (
                            <button
                              key={color}
                              className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                              style={{ backgroundColor: color }}
                              onClick={() => setAvatarConfig(prev => ({ ...prev, skinColor: color }))}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Цвет рубашки</label>
                        <div className="flex gap-2">
                          {['#00A2FF', '#2ECC40', '#FF6B6B', '#B10DC9'].map((color) => (
                            <button
                              key={color}
                              className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                              style={{ backgroundColor: color }}
                              onClick={() => setAvatarConfig(prev => ({ ...prev, shirtColor: color }))}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Цвет штанов</label>
                        <div className="flex gap-2">
                          {['#2ECC40', '#4A90E2', '#8B4513', '#333333'].map((color) => (
                            <button
                              key={color}
                              className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                              style={{ backgroundColor: color }}
                              onClick={() => setAvatarConfig(prev => ({ ...prev, pantsColor: color }))}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full">Сохранить Аватар</Button>
                  </div>
                </DialogContent>
              </Dialog>
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
                Добро пожаловать в BLOX2009!
              </h2>
              <p className="text-xl text-gray-600">
                {isLoggedIn ? 'Играй, создавай, исследуй безграничные миры' : 'Зарегистрируйся и начни своё приключение!'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Gamepad2" className="text-roblox-blue" />
                    Популярные Игры
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {games.slice(0, 3).map((game) => (
                      <div key={game.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <img 
                          src={game.image} 
                          alt={game.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{game.title}</h4>
                          <p className="text-sm text-muted-foreground">{game.players}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Users" className="text-roblox-green" />
                    Друзья Онлайн
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {friends.filter(f => f.status !== 'offline').map((friend, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-roblox-blue to-roblox-purple rounded-full flex items-center justify-center text-white font-bold">
                          {friend.name[0]}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{friend.name}</h4>
                          <p className="text-sm text-muted-foreground">{friend.game}</p>
                        </div>
                        <Badge 
                          variant={friend.status === 'online' ? 'default' : 'secondary'}
                          className={friend.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'}
                        >
                          {friend.status === 'online' ? 'Онлайн' : 'В игре'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="ShoppingBag" className="text-roblox-yellow" />
                    Новинки Каталога
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {catalogItems.slice(0, 3).map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.type}</p>
                        </div>
                        <Badge variant="outline" className="text-roblox-yellow border-roblox-yellow">
                          {item.price} R$
                        </Badge>
                      </div>
                    ))}
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
              {games.map((game) => (
                <Card key={game.id} className="bg-white/95 backdrop-blur-sm hover:scale-105 transition-transform duration-200">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img 
                      src={game.image} 
                      alt={game.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-500">
                      ★ {game.rating}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{game.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{game.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{game.players}</span>
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

          {/* Other tabs */}
          <TabsContent value="каталог" className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-roblox-dark">Каталог</h2>
              <p className="text-gray-600 mt-2">Кастомизируй своего персонажа</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {catalogItems.map((item, index) => (
                <Card key={index} className="bg-white/95 backdrop-blur-sm text-center">
                  <CardHeader>
                    <div className="w-20 h-20 bg-gradient-to-br from-roblox-blue to-roblox-purple rounded-lg mx-auto mb-2"></div>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Badge variant="outline" className="text-roblox-yellow border-roblox-yellow">
                        {item.price} R$
                      </Badge>
                      <Button className="w-full bg-roblox-green hover:bg-roblox-green/90">
                        Купить
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
                  И
                </div>
                <CardTitle className="text-2xl">Игрок123</CardTitle>
                <p className="text-muted-foreground">Участник с 2024 года</p>
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
            <h2 className="text-3xl font-bold text-roblox-dark">Форум</h2>
            <div className="grid gap-4">
              {[
                "Обновления и новости",
                "Помощь новичкам",
                "Обсуждение игр",
                "Разработка игр"
              ].map((topic, index) => (
                <Card key={index} className="bg-white/95 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{topic}</h3>
                        <p className="text-muted-foreground">Последнее сообщение: сегодня</p>
                      </div>
                      <Badge variant="secondary">
                        {Math.floor(Math.random() * 100) + 1} тем
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}