FROM microsoft/dotnet:sdk AS build-env
WORKDIR /app
EXPOSE 80

COPY ./ ./
RUN dotnet restore "./WebApi/WebApi.csproj"
RUN dotnet publish "./WebApi/WebApi.csproj" -c Release -o out

FROM microsoft/dotnet:aspnetcore-runtime
WORKDIR /app
COPY --from=build-env /app/WebApi/out .
ENTRYPOINT ["dotnet", "WebApi.dll"]
