
# Hono Example Enviroment

## How to Hono

To install dependencies:
```sh
bun install
```

To run:
```sh
bun run dev
```

open http://localhost:3000

## How to Drizzle Enviroment

スキーマは、/db/schema.tsに書きます。
書き出した後は、`bun run generate`でスキーマからマイグレーションファイルを作成します。出力先は、root/drizzleになる。
今回は、tursoという本番向けsqliteサービスを使用するため、turso cliを使用してアカウント作成とログインを行います。
`turso auth signup`で`github`または`google`アカウントで簡単にアカウントを作成し、`turso auth login`でcliをログイン状態にさせます。
そしたら、ローカル環境でtursoを使用するために`turso dev`コマンドを実行して`http://127.0.0.1:8080`で立ち上がります。
その後に、別のウィンドまたはタブから`bunx drizzle-kit studio`コマンドを実行することで`https://local.drizzle.studio`が立ち上がり、UI上でデータベースを見ることができるstudioを立ち上げられます。

ローカル環境の`turso`を起動状態のまま、`bun run migration`コマンドを実行することでマイグレーションが行われます。
ちなみに、`turso --db-file <file_path>`を指定しないと、停止した際にデータが全て消えます。

drizzle link: https://orm.drizzle.team/
turso link: https://turso.tech/