import React from 'react';
import Icon from '@ant-design/icons';
import { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

const CustomIcon = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_350_40134)">
      <path d="M46.6776 38.2387C46.6776 39.5022 46.6776 40.7387 46.6776 41.9753C46.6776 42.3392 46.6945 42.7065 46.6642 43.067C46.5327 44.6405 45.3867 45.7019 43.8093 45.7221C43.5396 45.7254 43.2734 45.7221 42.9431 45.7221C42.9431 46.9283 42.9397 48.0705 42.9431 49.2161C42.9498 50.5605 42.6532 51.8207 41.9117 52.9494C40.641 54.8834 38.8343 55.9684 36.5221 55.9751C26.4779 56.0088 16.437 56.0055 6.39268 55.9819C2.92438 55.9751 0.0155814 53.0438 0.0122108 49.5733C-0.00801258 37.4738 -0.00127145 25.371 0.0189519 13.2715C0.0189519 12.9312 0.197592 12.51 0.436902 12.2674C4.36361 8.30836 8.30716 4.3628 12.2709 0.437461C12.5136 0.198234 12.9349 0.0230259 13.2754 0.0196566C21.0041 -0.000559795 28.7294 -0.00729858 36.4581 0.00954838C40.068 0.0162872 42.8689 2.89375 42.9329 6.61019C42.9498 7.61089 42.9363 8.61497 42.9363 9.61568C42.9363 9.81111 42.9363 10.0099 42.9363 10.2727C43.2262 10.2727 43.4554 10.2727 43.688 10.2727C45.4946 10.2828 46.6574 11.4352 46.6743 13.2479C46.6844 14.5956 46.6844 15.9468 46.6709 17.2945C46.6675 17.6449 46.7451 17.7898 47.136 17.8404C52.0031 18.457 55.8961 22.7226 55.9972 27.5274C56.1119 32.7937 52.6402 37.1638 47.6248 38.0736C47.3383 38.1241 47.0518 38.1713 46.6743 38.2353L46.6776 38.2387ZM1.86602 14.0026C1.86602 14.2587 1.86602 14.4373 1.86602 14.6159C1.86602 26.1122 1.86602 37.6119 1.86602 49.1083C1.86602 52.161 3.83443 54.122 6.8949 54.122C11.0137 54.122 15.1326 54.122 19.2514 54.122C24.9173 54.122 30.5866 54.1287 36.2525 54.122C38.6254 54.1186 40.6174 52.6192 40.9308 50.355C41.1364 48.859 40.9713 47.3124 40.9713 45.7221C40.7994 45.7221 40.6039 45.7221 40.4084 45.7221C39.3871 45.7221 38.3658 45.7322 37.3479 45.7153C36.7749 45.7052 36.4075 45.3245 36.4075 44.7955C36.4075 44.2732 36.7749 43.8992 37.3446 43.8588C37.5434 43.8453 37.7457 43.8554 37.9445 43.8554C38.9591 43.8554 39.977 43.8554 41.0117 43.8554C41.0286 43.7173 41.0522 43.6297 41.0522 43.5421C41.0522 41.5204 41.0657 39.4954 41.0387 37.4738C41.0387 37.2817 40.8331 37.0257 40.6545 36.9179C37.2974 34.8827 35.484 31.9008 35.484 27.9923C35.484 24.0838 37.2974 21.0952 40.6713 19.0904C40.9645 18.9152 41.0657 18.7333 41.0623 18.4031C41.0488 16.7453 41.0555 15.0876 41.0555 13.4298C41.0555 13.0154 41.0555 12.6043 41.0555 12.1663C40.8297 12.1562 40.6679 12.1427 40.5095 12.1427C39.4512 12.1427 38.3962 12.1562 37.3378 12.1326C36.7716 12.1191 36.4042 11.7182 36.4075 11.1926C36.4109 10.6636 36.7783 10.303 37.3547 10.2761C37.5906 10.266 37.8299 10.2727 38.0659 10.2727C39.0433 10.2727 40.0242 10.2727 41.0555 10.2727C41.0555 9.04289 41.0657 7.88045 41.0555 6.71801C41.0252 3.8237 39.0467 1.87282 36.1413 1.87282C28.962 1.86945 21.7793 1.87282 14.6 1.87282H14.0034C14.0034 3.70577 14.0034 5.45448 14.0034 7.2032C14.0034 11.1892 11.1755 14.006 7.1814 14.006C5.43545 14.006 3.68949 14.006 1.86939 14.006L1.86602 14.0026ZM54.13 28.0429C54.1367 23.4167 50.392 19.6194 45.8047 19.5958C41.1364 19.5722 37.3378 23.3426 37.3311 28.0058C37.3243 32.6185 41.1331 36.4091 45.7676 36.399C50.3347 36.3922 54.1232 32.605 54.13 28.0395V28.0429ZM3.39288 12.1292C4.81189 12.1292 6.25112 12.1697 7.68698 12.1191C9.79358 12.0484 11.7451 10.4917 11.9878 8.4465C12.1867 6.76855 12.0283 5.05016 12.0283 3.49687C9.21722 6.30694 6.30842 9.21472 3.39288 12.1292ZM42.9734 12.1427V18.0627C43.543 17.9718 44.0756 17.901 44.6014 17.7898C44.689 17.773 44.7935 17.5809 44.7935 17.4664C44.8036 15.9939 44.8171 14.5249 44.7868 13.0525C44.7766 12.4797 44.4025 12.1697 43.8329 12.1427C43.5632 12.1292 43.2936 12.1427 42.9734 12.1427ZM42.9835 37.9253V43.8521C43.2936 43.8521 43.5666 43.8622 43.8363 43.8521C44.4059 43.8251 44.7766 43.5118 44.7901 42.939C44.8205 41.4699 44.8104 39.9975 44.7935 38.5251C44.7935 38.4105 44.6519 38.2184 44.5475 38.1949C44.0553 38.0837 43.5498 38.0163 42.9869 37.9253H42.9835Z" fill="#979BAA" stroke="#979BAA" stroke-width="0.2" />
      <path d="M19.1267 25.1957C15.409 25.1957 11.6913 25.1957 7.97018 25.1957C7.75109 25.1957 7.52864 25.2024 7.31629 25.1687C6.868 25.098 6.59836 24.8217 6.55454 24.3668C6.50736 23.8917 6.7197 23.548 7.17473 23.3964C7.37696 23.329 7.60616 23.3223 7.82187 23.3223C15.3686 23.3189 22.9153 23.3223 30.4586 23.3223C30.6574 23.3223 30.863 23.329 31.0518 23.3829C31.5102 23.5177 31.7461 23.8479 31.7158 24.323C31.6855 24.7981 31.4124 25.0946 30.9372 25.1687C30.7417 25.199 30.5361 25.1923 30.3372 25.1923C26.5993 25.1923 22.8647 25.1923 19.1267 25.1923V25.1957Z" fill="#979BAA" stroke="#979BAA" stroke-width="0.2" />
      <path d="M14.0844 36.9819C13.3125 37.8445 12.3654 38.2791 11.2261 38.269C9.91499 38.2555 8.92067 37.6861 8.24656 36.5607C7.73086 35.6982 7.51178 34.7413 7.46459 33.7473C7.43762 33.1341 7.78816 32.7163 8.31734 32.6792C8.89371 32.6354 9.22739 32.9858 9.33525 33.6395C9.433 34.2258 9.52737 34.8322 9.74646 35.3781C10.0633 36.1699 10.7677 36.5102 11.5531 36.3788C12.3789 36.2407 12.9552 35.6342 13.0462 34.7986C13.0631 34.6368 13.0665 34.4684 13.1035 34.31C13.2148 33.8383 13.5383 33.5889 14.0069 33.5923C14.4484 33.5923 14.7585 33.8349 14.8866 34.2729C15.3787 35.9374 16.0292 36.4327 17.7819 36.3889C18.3582 36.3754 18.9447 36.2946 19.5076 36.1632C20.0267 36.0385 20.475 35.7993 20.5862 35.1557C20.6738 34.657 21.203 34.4178 21.7018 34.5492C22.1704 34.6739 22.4703 35.1422 22.3827 35.6476C22.2041 36.6483 21.6007 37.3627 20.6839 37.703C18.4088 38.5419 16.1707 38.6733 14.081 36.9853L14.0844 36.9819Z" fill="#979BAA" stroke="#979BAA" stroke-width="0.2" />
      <path d="M21.9208 18.6725C24.7251 18.6725 27.5294 18.6725 30.3337 18.6725C30.5326 18.6725 30.7382 18.6624 30.9337 18.6927C31.3853 18.7568 31.655 19.0364 31.7123 19.4812C31.7729 19.9529 31.5606 20.2999 31.1089 20.4617C30.9269 20.5257 30.718 20.5425 30.5191 20.5425C24.8026 20.5459 19.0828 20.5459 13.3663 20.5425C13.1506 20.5425 12.9214 20.5257 12.7259 20.4516C12.3079 20.2898 12.099 19.9529 12.1495 19.5048C12.2001 19.06 12.4596 18.7736 12.9113 18.6995C13.1068 18.6691 13.309 18.6759 13.5112 18.6759C16.3155 18.6759 19.1198 18.6759 21.9242 18.6759L21.9208 18.6725Z" fill="#979BAA" stroke="#979BAA" stroke-width="0.2" />
      <path d="M14.9808 27.9957C17.4042 27.9957 19.8276 27.9923 22.2511 27.9957C22.9589 27.9957 23.3633 28.4 23.3128 29.0166C23.269 29.5355 22.8982 29.8522 22.2915 29.8589C21.2905 29.8691 20.286 29.8589 19.285 29.8589C15.4223 29.8589 11.5596 29.8589 7.69361 29.8589C7.01275 29.8589 6.63188 29.5961 6.55436 29.084C6.45661 28.4573 6.88467 27.999 7.59586 27.9957C9.74628 27.9889 11.8967 27.9957 14.0471 27.9957C14.3572 27.9957 14.6673 27.9957 14.9774 27.9957H14.9808Z" fill="#979BAA" stroke="#979BAA" stroke-width="0.2" />
      <path d="M8.40166 41.9921C8.07472 41.9921 7.74777 42.0123 7.4242 41.9887C6.89839 41.9483 6.54785 41.5641 6.54785 41.0621C6.54785 40.5567 6.89502 40.1625 7.4242 40.1423C8.07472 40.1153 8.72861 40.1187 9.38249 40.1423C9.89145 40.1625 10.2723 40.5837 10.2723 41.0621C10.2723 41.5406 9.89145 41.9516 9.38249 41.9887C9.05892 42.0123 8.72861 41.9921 8.40503 41.9921H8.40166Z" fill="#979BAA" stroke="#979BAA" stroke-width="0.2" />
      <path d="M19.6053 41.9955C19.2985 41.9955 18.9884 42.009 18.6817 41.9955C18.1357 41.9686 17.7346 41.571 17.7312 41.0723C17.7279 40.5736 18.1256 40.1592 18.6682 40.1424C19.2851 40.1221 19.9019 40.1221 20.5187 40.1424C21.0849 40.1592 21.4523 40.5366 21.4557 41.0622C21.4557 41.5878 21.095 41.9652 20.5322 41.9989C20.2254 42.0157 19.9153 41.9989 19.6086 42.0023L19.6053 41.9955Z" fill="#979BAA" stroke="#979BAA" stroke-width="0.2" />
      <path d="M32.6998 10.276C33.0065 10.276 33.3166 10.2625 33.6233 10.276C34.1424 10.3063 34.5233 10.6904 34.5368 11.1756C34.5502 11.6305 34.2031 12.0854 33.7244 12.1123C33.02 12.1528 32.3088 12.1561 31.6077 12.1123C31.1156 12.082 30.8055 11.6507 30.819 11.1689C30.8325 10.6803 31.1662 10.3198 31.6684 10.2827C32.0122 10.2592 32.356 10.2794 32.6998 10.2794V10.276Z" fill="#979BAA" stroke="#979BAA" stroke-width="0.2" />
      <path d="M8.38818 18.6794C8.71513 18.6794 9.04544 18.6626 9.37239 18.6828C9.88134 18.7165 10.2386 19.0703 10.269 19.5454C10.2993 19.9834 9.99594 20.4551 9.53417 20.4888C8.7758 20.5461 8.00394 20.5562 7.24893 20.4787C6.7602 20.4281 6.52426 20.0272 6.5546 19.5184C6.58156 19.0568 6.91525 18.7232 7.40735 18.6862C7.73429 18.6626 8.06461 18.6828 8.39155 18.6828L8.38818 18.6794Z" fill="#979BAA" stroke="#979BAA" stroke-width="0.2" />
      <path d="M14.0237 40.1322C14.3304 40.1322 14.6405 40.1187 14.9472 40.1322C15.4764 40.1625 15.8438 40.5332 15.8607 41.0251C15.8775 41.517 15.5236 41.9517 15.0079 41.9753C14.3372 42.009 13.6664 42.009 12.9957 41.9753C12.48 41.9517 12.1261 41.5238 12.1362 41.0285C12.1497 40.5332 12.5137 40.1592 13.0429 40.1288C13.3698 40.1086 13.6968 40.1255 14.0203 40.1255L14.0237 40.1322Z" fill="#979BAA" stroke="#979BAA" stroke-width="0.2" />
      <path d="M25.2374 40.1357C25.5644 40.1357 25.8913 40.1121 26.2149 40.1424C26.7104 40.1829 27.0474 40.5636 27.0542 41.0454C27.0609 41.5273 26.7373 41.9484 26.2486 41.9754C25.561 42.0158 24.8701 42.0124 24.1825 41.9787C23.6769 41.9552 23.3129 41.5003 23.3331 41.0218C23.3533 40.5535 23.7173 40.1862 24.2027 40.1357C24.2398 40.1323 24.2735 40.1323 24.3105 40.1323C24.6173 40.1323 24.9274 40.1323 25.2341 40.1323C25.2341 40.1323 25.2341 40.1357 25.2341 40.1391L25.2374 40.1357Z" fill="#979BAA" stroke="#979BAA" stroke-width="0.2" />
      <path d="M32.6562 45.7153C32.3292 45.7153 32.0023 45.7322 31.6787 45.712C31.1731 45.6783 30.8361 45.3211 30.8158 44.8359C30.7956 44.3271 31.1225 43.8992 31.645 43.8723C32.3326 43.8352 33.0235 43.8352 33.7111 43.8723C34.1931 43.8992 34.5437 44.3406 34.5403 44.7989C34.5336 45.2807 34.1561 45.6682 33.6404 45.7153C33.6033 45.7153 33.5696 45.7187 33.5325 45.7187C33.2426 45.7187 32.9528 45.7187 32.6629 45.7187C32.6629 45.7187 32.6629 45.7187 32.6629 45.7153H32.6562Z" fill="#979BAA" stroke="#979BAA" stroke-width="0.2" />
      <path d="M49.1074 28.0082C49.8841 28.7244 50.202 29.5772 49.8685 30.558C49.538 31.5359 48.7847 32.1154 47.676 32.252C47.3831 32.288 47.2907 32.38 47.3236 32.6303C47.3361 32.7237 47.3283 32.8215 47.3189 32.9164C47.2844 33.2602 47.048 33.4816 46.7034 33.4989C46.3448 33.5176 46.0504 33.3019 46.005 32.9553C45.9768 32.7468 46.0003 32.5325 46.0003 32.3038H45.3629C45.2846 32.7928 45.5101 33.437 44.6597 33.4946C44.2055 33.5248 44.0834 33.2932 43.9722 32.2822C43.5963 32.2822 43.2111 32.2851 42.8274 32.2822C42.3012 32.2751 41.9942 32.0435 42.0005 31.6639C42.0067 31.2871 42.3184 31.0599 42.843 31.0527C42.9855 31.0512 43.1281 31.0527 43.2988 31.0527V28.6237C42.771 28.5662 42.0475 28.7704 42.0114 27.9651C41.9927 27.5524 42.3027 27.4229 43.2956 27.3683V24.9422C43.1014 24.9422 42.8978 24.9494 42.6958 24.9408C42.2808 24.9235 41.9864 24.6517 42.0005 24.3094C42.0146 23.9772 42.298 23.7313 42.7021 23.7227C43.1171 23.7141 43.5321 23.7213 44.0082 23.7213C44.0082 23.4998 43.9988 23.3013 44.0098 23.1043C44.0301 22.7448 44.2823 22.5118 44.6425 22.5003C44.998 22.4903 45.2877 22.7146 45.3268 23.0597C45.3503 23.2596 45.3315 23.4638 45.3315 23.6925H45.9909C45.9909 23.5185 45.9815 23.333 45.9924 23.1475C46.019 22.7448 46.2821 22.4974 46.669 22.5003C47.0574 22.5032 47.3064 22.7491 47.3236 23.159C47.3314 23.3359 47.3236 23.5127 47.3236 23.6853C49.892 23.8708 50.8363 26.4623 49.1058 28.0068L49.1074 28.0082ZM44.6832 27.3755C45.6463 27.3755 46.5813 27.4042 47.5131 27.3654C48.1536 27.3395 48.6375 26.7959 48.6516 26.1948C48.6673 25.5778 48.2053 25.0069 47.5366 24.9695C46.5954 24.9178 45.6479 24.9566 44.6832 24.9566V27.3755ZM44.6832 31.0512C45.6056 31.0512 46.4873 31.0627 47.369 31.0469C48.0737 31.034 48.6031 30.5551 48.6485 29.9281C48.6955 29.2896 48.2648 28.7014 47.5679 28.6525C46.6189 28.5878 45.6588 28.6367 44.6847 28.6367V31.0498L44.6832 31.0512Z" fill="#979BAA" stroke="#979BAA" stroke-width="0.4" />
    </g>
    <defs>
      <clipPath id="clip0_350_40134">
        <rect width="56" height="56" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const DestructionIcon = (props: IconComponentProps) => <Icon component={CustomIcon} {...props} />;