FROM microsoft/dotnet:sdk AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY ./Kaplan.Ontrack.Framework.Fernet/*.csproj ./Kaplan.Ontrack.Framework.Fernet/
COPY ./Kaplan.Ontrack.IdentityService/*.csproj ./Kaplan.Ontrack.IdentityService/
COPY ./Kaplan.Ontrack.IdentityService/key.rsa ./Kaplan.Ontrack.IdentityService/
RUN dotnet restore ./Kaplan.Ontrack.IdentityService/Kaplan.Ontrack.IdentityService.csproj

# Copy everything else and build
COPY . ./
WORKDIR /app/Kaplan.Ontrack.IdentityService
RUN dotnet publish "Kaplan.Ontrack.IdentityService.csproj" -c Release -o /app/out

# Build runtime image
FROM microsoft/dotnet:aspnetcore-runtime
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "Kaplan.Ontrack.IdentityService.csproj.dll"]