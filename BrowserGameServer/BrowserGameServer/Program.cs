using BrowserGameServer.ChatServer;
using BrowserGameServer.ChatServer.Connection;
using BrowserGameServer.GameServer;
using BrowserGameServer.GameServer.Connection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

builder.Services.AddTransient<ChatConnectionManager>();
builder.Services.AddTransient<ChatHandler>();
builder.Services.AddScoped<ChatConnectionHandler>();

builder.Services.AddTransient<GameConnectionManager>();
builder.Services.AddTransient<GameHandler>();
builder.Services.AddTransient<GameConnectionHandler>();

var app = builder.Build();

// Configure the HTTP request pipeline.
/*if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}*/

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseWebSockets();
app.MapControllers();

app.Run();