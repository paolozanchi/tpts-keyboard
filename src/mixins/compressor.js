const compressor = require('lzutf8');

export default {
  methods: {
    compressSequence(sequence) {
      // compress the melody
      let theCompressedMelody = compressor.compress(sequence, {outputEncoding: "StorageBinaryString"});
      let theExpandedMelody = compressor.decompress(theCompressedMelody, {inputEncoding: "StorageBinaryString"});
      
      console.log("sequence:", sequence);
      console.log("theCompressedMelody:", theCompressedMelody);
      console.log("theExpandedMelody:", theExpandedMelody);

      console.assert(sequence === theExpandedMelody, 'the word is %s', 'foo');

      return '!%' + theCompressedMelody;
    }
  }
};