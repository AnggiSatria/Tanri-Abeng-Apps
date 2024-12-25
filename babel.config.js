module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      "react-native-reanimated/plugin", // Harus ditempatkan di urutan terakhir sesuai dokumentasi
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@": "./src", // Ganti dengan folder utama Anda
            "@env": "./constants/env.d.ts", // Alias tambahan jika diperlukan
          },
        },
      ],
    ],
  };
};
