//  ExampleNativeModule.m
#import "ExampleNativeModule.h"

@implementation ExampleNativeModule

// This is how RN bridge knows about our module
RCT_EXPORT_MODULE();

// Method called from RN app
// Example method that reverses character order
RCT_EXPORT_METHOD(reverseCharacterOrder:(NSString *)text resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSMutableString *reversedString = [NSMutableString string];
  NSInteger charIndex = [text length];
  
  while (text && charIndex > 0) {
    charIndex--;
    NSRange subStrRange = NSMakeRange(charIndex, 1);
    [reversedString appendString:[text substringWithRange:subStrRange]];
  }
  
  resolve(reversedString);
}

@end

